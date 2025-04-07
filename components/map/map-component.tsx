"use client";
import {useEffect, useRef, useState} from 'react';
import maplibregl, {CustomLayerInterface, MercatorCoordinate} from 'maplibre-gl';
import * as THREE from 'three';
import {GLTFLoader} from 'three-stdlib';
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/custom-sheet";
import {Company} from "@/types/company.types";
import {companies} from "@/repository/companies";
import {SheetTitle} from "@/components/ui/sheet";
import {X} from 'lucide-react';
import {truncateText} from "@/utils/truncate-text";
import Link from "next/link";

const MapComponent = () => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);
    const renderer = useRef<THREE.WebGLRenderer | null>(null);
    const scene = useRef<THREE.Scene | null>(null);
    const camera = useRef<THREE.Camera | null>(null);
    const modelsRef = useRef<{ [key: string]: THREE.Group }>({});
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://api.maptiler.com/maps/basic/style.json?key=PNCxlsnKd7QsUe4nKdJX',
            zoom: 15,
            center: [-0.1900, 5.5620],
            pitch: 60,
            canvasContextAttributes: {antialias: true},
            maplibreLogo: false,
            attributionControl: false,
        });

        const createCustomLayer = (model: Company, modelTransform: {
            translateX: number;
            translateY: number;
            translateZ: number | undefined;
            rotateX: number;
            rotateY: number;
            rotateZ: number;
            scale: number
        }) => ({
            id: model.id,
            type: 'custom',
            renderingMode: '3d',
            onAdd: (map: maplibregl.Map, gl: WebGLRenderingContext) => {
                camera.current = new THREE.Camera();
                scene.current = new THREE.Scene();

                const light = new THREE.DirectionalLight(0xffffff, 2);
                const light2 = new THREE.DirectionalLight(0xffffff, 1);
                light.position.set(0, -70, 100).normalize();
                light2.position.set(0, 70, 100).normalize();
                scene.current.add(light);
                scene.current.add(light2);

                const loader = new GLTFLoader();
                loader.load(model.gltfPath, (gltf) => {
                    gltf.scene.name = model.id;
                    modelsRef.current[model.id] = gltf.scene;
                    scene.current?.add(gltf.scene);
                });

                renderer.current = new THREE.WebGLRenderer({canvas: map.getCanvas(), context: gl, antialias: true});
                renderer.current.autoClear = false;
            },
            render: (gl: WebGLRenderingContext, args: { defaultProjectionData: { mainMatrix: number[] } }) => {
                if (!renderer.current || !scene.current || !camera.current) return;

                const rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), modelTransform.rotateX);
                const rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), modelTransform.rotateY);
                const rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), modelTransform.rotateZ);

                const m = new THREE.Matrix4().fromArray(args.defaultProjectionData.mainMatrix);
                const l = new THREE.Matrix4()
                    .makeTranslation(modelTransform.translateX, modelTransform.translateY, modelTransform.translateZ!)
                    .scale(new THREE.Vector3(modelTransform.scale, -modelTransform.scale, modelTransform.scale))
                    .multiply(rotationX).multiply(rotationY).multiply(rotationZ);

                camera.current.projectionMatrix = m.multiply(l);
                renderer.current.resetState();
                renderer.current.render(scene.current, camera.current);
            },
        });

        map.current.on('style.load', () => {
            companies.map((model) => {
                const mercCoords = MercatorCoordinate.fromLngLat(model.coords, 0);
                const modelTransform = {
                    translateX: mercCoords.x,
                    translateY: mercCoords.y,
                    translateZ: mercCoords.z,
                    rotateX: Math.PI / 2,
                    rotateY: 0,
                    rotateZ: 0,
                    scale: mercCoords.meterInMercatorCoordinateUnits(),
                };
                const customLayer = createCustomLayer(model, modelTransform);
                map.current?.addLayer(customLayer as CustomLayerInterface);
            });
        });

        return () => {
            map.current?.remove();
            renderer.current?.dispose();
        };
    }, []);

    const flyToBuilding = (model: Company) => {
        map.current?.flyTo({
            center: [model.coords[0], model.coords[1]],
            zoom: 17,
            pitch: 72,
            bearing: 3,
            speed: 0.8,
        });

        // Highlight the selected building
        // Object.values(modelsRef.current).forEach((modelObj) => {
        //     modelObj.traverse((child) => {
        //         if ((child as THREE.Mesh).isMesh) {
        //             ((child as THREE.Mesh).material as THREE.MeshStandardMaterial).color.set(0xffffff); // Reset color
        //         }
        //     });
        // });

        // const selectedObj = modelsRef.current[model.id];

        // if (selectedObj) {
        //     selectedObj.traverse((child) => {
        //         if ((child as THREE.Mesh).isMesh) {
        //             ((child as THREE.Mesh).material as THREE.MeshStandardMaterial).color.set(0xff0000); // Highlight red
        //         }
        //     });
        // }

        setSelectedCompany(model);
    };

    return (
        <div className="relative w-full h-[80dvh]">
            <div ref={mapContainer} className="w-full h-full"/>

            <Sheet>
                <SheetTrigger asChild>
                    <Button className="absolute top-4 left-4 z-10">Company Legend</Button>
                </SheetTrigger>

                <SheetContent side="left" className="w-80 p-4">
                    <SheetTitle className="text-xl font-bold mb-2 sticky">
                        Companies
                    </SheetTitle>
                    <div className="overflow-auto">
                        {companies.map((model) => (
                            <Card key={model.id} className="mb-3 cursor-pointer hover:shadow-lg"
                                  onClick={() => {
                                      flyToBuilding(model)
                                  }}
                            >
                                <CardContent className="p-4">
                                    <p className="font-medium">{model.name}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>

            {selectedCompany && (
                <div
                    className="absolute bottom-6 left-1/2 bg-background -translate-x-1/2 p-4 rounded-xl shadow-xl md:max-h-40 max-w-96 z-10">
                    <div className="flex justify-between items-center">
                        <Link href={`/company/${selectedCompany.id}`}
                              className="text-lg font-black hover:underline truncate">
                            {selectedCompany.name}
                        </Link>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedCompany(null)}>
                            <X className="w-4 h-4"/>
                        </Button>
                    </div>
                    <div className="text-sm text-muted-foreground/85">
                        {truncateText(selectedCompany.description, 100)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapComponent;
