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
import {useTypeSafeTranslation} from "../inputField/hooks/useTypeSafeTranslation.tsx";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);
const DrivenKilometres = () => {
    const { t } = useTypeSafeTranslation();
    const labels = [t('TEXT.JUNE'), t('TEXT.JULY'), t('TEXT.AUGUST'), t('TEXT.SEPTEMBER'), t('TEXT.OCTOBER'), t('TEXT.NOVEMBER'), t('TEXT.DECEMBER')];
    const data = {
        labels,
        type: 'bar',
        datasets: [{
            label: t('TEXT.DRIVING_TIME_PER_MONTH'),
            data: [10000, 8572, 9360, 11604, 11203, 9933, 8742],
            backgroundColor: [
                'rgb(102,209,255)'
            ],
            borderColor: [
                'rgb(102,209,255)'
            ],
            borderWidth: 1
        }]
    };

    return <Bar data={data} type={'bar'} />;
};

export default DrivenKilometres;