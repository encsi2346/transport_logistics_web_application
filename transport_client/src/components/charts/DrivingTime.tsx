import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {useTypeSafeTranslation} from "../inputField/hooks/useTypeSafeTranslation";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const DrivingTime = () => {
    const { t } = useTypeSafeTranslation();
    const labels = [t('TEXT.JUNE'), t('TEXT.JULY'), t('TEXT.AUGUST'), t('TEXT.SEPTEMBER'), t('TEXT.OCTOBER'), t('TEXT.NOVEMBER'), t('TEXT.DECEMBER')];
    const data = {
        labels,
        datasets: [{
            label: t('TEXT.DRIVING_TIME_PER_MONTH'),
            data: [120, 112, 80, 120, 120, 120, 40],
            backgroundColor: [
                'rgb(153, 102, 255)'
            ],
            borderColor: [
                'rgb(153, 102, 255)'
            ],
            borderWidth: 1
        }]
    };

    return <Bar data={data}  type={'bar'}/>;
};

export default DrivingTime;