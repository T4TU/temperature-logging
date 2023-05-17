export const parseContent = (content) => {
    let data = [];
    const lines = content.split("\n");
    for (const line of lines) {
        const values = line.split(" ");
        const time = values[0];
        const temperature = parseFloat(values[1]);
        const humidity = parseFloat(values[2]);
        data.push({
            time: time,
            temperature: temperature,
            humidity: humidity,
        });
    }
    return data;
};

export const formatDate = (date) => {
    return date.replaceAll("-", ".");
};