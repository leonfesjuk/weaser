export async function getLocation() {
    const locationsFile = "current.city.list.json";

    try {
        const response = await fetch(`./src/${locationsFile}`);
        if (!response.ok) {
            throw new Error(`File not exist or path is wrong. Status: ${response.status}`);
        }
        const data = await response.json();
        return data; 
    } catch (err) {
        console.error("Error loading or parsing city list:", err);
        return []; 
    }
}