import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ServiceRequestStatus } from 'src/graphql/generated';

type StatusType = 'pending' | 'approved' | 'cancel';

interface StatusBoxProps {
	status: StatusType;
}

const StyledBox = styled(Box)<{ status: StatusType }>(({ status }) => ({
	width: '100px',
	height: '40px',
	borderRadius: '6px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontFamily: 'Vazir',
	fontWeight: 'bold',
	fontSize: '14px',
	color: '#fff',
	backgroundColor:
		status === ServiceRequestStatus?.Pending
			? '#FFC107'
			: status === ServiceRequestStatus?.AcceptedBySpecialist
			? '#87f555ff'
			: status === ServiceRequestStatus?.Cancelled
			? '#F44336'
			: status === ServiceRequestStatus?.Paid
			? '#4CAF50'
			: status === ServiceRequestStatus?.PendingPayment
			? '#5956faff'
			: '#f89008ff',
}));

export default function StatusBox({ status }: StatusBoxProps) {
	return (
		<StyledBox status={status}>
			<Typography sx={{ fontFamily: 'Vazir', fontWeight: 'bold', fontSize: '14px' }}>
				{status === ServiceRequestStatus?.Pending
					? 'در انتظار'
					: status === ServiceRequestStatus?.AcceptedBySpecialist
					? 'تایید متخصص'
					: status === ServiceRequestStatus?.Cancelled
					? 'انصراف'
					: status === ServiceRequestStatus?.Paid
					? 'پرداخت شده'
					: status === ServiceRequestStatus?.PendingPayment
					? 'مرحله پرداخت'
					: 'متخصص رسیده'}
			</Typography>
		</StyledBox>
	);
}
