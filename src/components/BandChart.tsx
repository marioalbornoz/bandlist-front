import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useContext, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { SocketContext } from '../context/SocketContext';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



export const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};


export const BandChart = () => {
  const { socket } = useContext(SocketContext);
  const [datos, setDatos] = useState<any[]>([])

  useEffect(() => {
    socket.on("current-bands", (bands: any[]) => {
        console.log(bands);
        
      setDatos(bands)
    });
    return () => socket.off("current-bands");
  }, [socket]);

  

    const labels = datos?.map(dato => dato.name)

    const data = {
      labels,
      datasets: [
        {
          label: "votos en bandas",
          data: datos.map(dato => dato.votes),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };


  return <Bar options={options} height={100} data={data} />;
};