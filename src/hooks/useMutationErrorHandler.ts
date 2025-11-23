import { useSnackbar } from 'notistack';

const useMutationErrorHandler = () => {
    const { enqueueSnackbar } = useSnackbar();

    return (err: any, mutationKey?: string) => {
        if (err?.[mutationKey]) {
            enqueueSnackbar(err?.[mutationKey]?.status?.value || err?.[mutationKey]?.value, {
                variant: 'error'
            });
            return;
        }

        if (Array.isArray(err?.response?.errors) && err.response.errors.length < 1) {
            return;
        }

        enqueueSnackbar(err.response.errors[0].message, { variant: 'error' });
    };
};

export default useMutationErrorHandler;
