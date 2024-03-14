import { Server } from 'azle';
import express, { Request } from 'express';


interface SensorData {
    moduleId: number;
    temperature: number;
    humidity: number;
    valve: boolean;
    client: number;
    id: number;
    dateTime: string;
}



let sensorData: SensorData[] = [];

export default Server(() => {
    const app = express();

    app.use(express.json());

    app.post('/sensorData', (req: Request<{}, {}, SensorData>, res) => {
        const message = req.body;
        sensorData.push(message);
        res.sendStatus(200);
    });

    app.get('/sensorData', (req, res) => {
        res.json(sensorData);
    });

    app.get('/', (req, res) => {
        res.send('Hello, Worasdfasdfasdfasdfasdld! ' + JSON.stringify(sensorData));
    });

    app.delete('/sensorData', (req, res) => {
        sensorData = [];
        res.sendStatus(200);
    });

    return app.listen();
});