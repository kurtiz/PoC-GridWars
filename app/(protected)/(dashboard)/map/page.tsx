import MapComponent from "@/components/map/map-component";

export default function Map() {
    return (
        <div className="flex flex-1 flex-col p-4">
            <h1>3D Map with Company Locations</h1>
            <MapComponent/>
        </div>
    );
};