import { MenuItem as MMenuItem } from '@mui/material';
import { styled } from '@mui/system';

export const MenuItem = styled(MMenuItem)({
    height: 48,
    '&:not(:last-child)': {
        borderBottom: '1px solid #E8E8E8'
    }
});
