import axios from 'axios';
import { HOSTS, APIS  } from '../../../../env.js';
import net from 'net';

// Validar que el host este activo y responda a un puerto especifico por tcp
const checkHost = (host, port) => {
  return new Promise((resolve) => {
    const socket = net.createConnection(port, host);

    socket.on('connect', () => {
      socket.end();
      resolve(true);
    });

    socket.on('error', (error) => {
      resolve(false);
    });
  });
};

//Validar que la api responda
const checkApi = async ({
  protocol = 'http',
  host = 'localhost',
  port = 80,
  apiVersion = 'v1',
  basePath = 'api',
  endpoint = 'aplicacion/status',
  url= `${protocol}://${host}:${port}/${basePath}/${apiVersion}/${endpoint}`,
}) => {
  try{
    const { status, data } = await axios.get(url);
    if (status !== 200) {
      return 'La API no respondio un codigo 200';
    }
    const { message } = data;
    return message;
  }catch(error){
    return error.toString();
  }
};


module.exports = {
  getAllStatus: async (req, res) => {

    const messages = [];

    for (const { name, host, port, service } of HOSTS) {
      const hostStatus = await checkHost(host, port);
      messages.push({
        name,
        host,
        port,
        service,
        hostStatus,
        timestamp: new Date().toLocaleString(),
      });
    }

    const APIS = [
      { name: 'aut-api', host: '172.19.2.101', port: '5004', service: 'Atenticacion' },
      { name: 'hub-hooks', host: '172.19.2.101', port: '4001', service: 'Integracion con webhooks' },
      { name: 'crm-urbanhomes', host: '172.19.2.101', port: '5007', service: 'Crm urban homes' },
    ];

    for (const api of APIS) {
      const apiStatus = await checkApi({ ...api });
      const { name, host, port, service } = api;
      messages.push({
        name,
        host,
        port,
        service,
        apiStatus,
        timestamp: new Date().toLocaleString(),
      });
    }




    return res.status(200).json({
      error: false,
      message: 'El endpoint funciona correctamente',
      data: messages,
    });
  },
};
