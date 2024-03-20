export async function deleteData(id: string) {
  try {
    const url = `/api/area?${new URLSearchParams({ id: id }).toString()}`;
    const response: any = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al realizar el Delete ");
    }
  } catch (error) {
    console.error("Error al eliminar los datos:", error);
  }
}

export async function getData() {
  const response = await fetch("/api/area");
  return await response.json();
}

export async function updateData(id: string, dataUpdate: any) {
  try {
    const url = `/api/area?${new URLSearchParams({ id: id }).toString()}`;
    const response: any = await fetch(url, {
      method: "PUT", // Especifica el método PUT
      headers: {
        "Content-Type": "application/json", // Especifica el tipo de contenido del cuerpo (en este caso, JSON)
      },
      body: JSON.stringify(dataUpdate), // Convierte el objeto en una cadena JSON
    });

    if (!response.ok) {
      throw new Error("Error al realizar la solicitud PUT");
    }
  } catch (error) {
    console.error("Error al actualizar los datos:", error);
  }
}

export async function createData(newData: any) {
  try {
    const response: any = await fetch("/api/area", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Especifica el tipo de contenido del cuerpo (en este caso, JSON)
      },
      body: JSON.stringify(newData), // Convierte el objeto en una cadena JSON
    });

    if (!response.ok) {
      throw new Error("Error al realizar la solicitud POST");
    }
  } catch (error) {
    console.error("Error al crear con estos datos:", error);
  }
}
