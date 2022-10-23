const BASE_URL = 'http://localhost:5050';
const RESOURSE_URL = `${BASE_URL}/animal`;

const baseRequest = async ({urlPath = '', method = 'GET', body = null}) => {
    try {
        const reqParameters = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (body) {
            reqParameters.body = JSON.stringify(body);
        }
        return await fetch(`${RESOURSE_URL}${urlPath}`, reqParameters);
    } catch (error) {
        console.log('HTTP erorr: ', error)
    }
};

export const getAllAnimals = async () => {
    const rawResponse = await baseRequest({ method: "GET" });
  
    return await rawResponse.json();
};

export const postAnimal = (body) => baseRequest({ method: "POST", body });

export const editAnimal = (id, body) =>
  baseRequest({ urlPath: `/${id}`, method: "PUT", body });

export const deleteAnimal = (id) =>
  baseRequest({ urlPath: `/${id}`, method: "DELETE" });

