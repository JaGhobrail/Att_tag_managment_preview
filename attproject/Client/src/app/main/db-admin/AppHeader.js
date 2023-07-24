import Typography from '@mui/material/Typography';
import AppConfig from './AppConfig'
function AppHeader(props) {
    return (
        <div className="flex w-auto container bg-hbg py-16">
            <div className="flex flex-col sm:flex-row  flex-auto sm:items-center justify-between min-w-0 p-24 md:p-32 pb-0 md:pb-0">
                <div className="flex flex-col">
                    <Typography className="text-3xl font-semibold tracking-tight leading-8 text-white">
                        AdTech {AppConfig.settings.name}
                    </Typography>
                    <Typography className="text-xl font-medium tracking-tight text-grey-400">
                    </Typography>
                </div>
            </div>
        </div>
    );
}

export default AppHeader;
