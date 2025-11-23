import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import {
	useServiceCategory_GetAllQuery,
	useServiceSubCategory_GetAllQuery,
	useServiceTypes_GetAllQuery,
} from 'src/graphql/generated';

import { FormProvider, SelectField, useForm } from '@/components/atoms/Form';

import Modal from './ModalInsert';

interface IPageProps {
	DataRow?: any;
	onRefreshItem: () => void;
	onSearchItem: (value: string) => void;
	openModal?: boolean;
}

const Index: FC<IPageProps> = ({ DataRow, onRefreshItem, onSearchItem, openModal }) => {
	const [open, setOpen] = useState(false);
	const [DataRows, setDataRow] = useState(null);
	const [categoryId, setCategoryId] = useState('');
	const [subId, setSubId] = useState('');
	const [typeId, setTypeId] = useState('');

	useEffect(() => {
		setDataRow(DataRow);
	}, [DataRow]);
	/** -------------------- 1) Categories -------------------- **/
	const { data: catData, isSuccess: catSuccess } = useServiceCategory_GetAllQuery(
		{ skip: 0, take: 1000 },
		{ keepPreviousData: true }
	);

	const categoryList =
		catData?.serviceCategory_getAll.result?.items?.map((x) => ({
			option: x.name,
			value: x.id,
		})) || [];

	useEffect(() => {
		if (catSuccess && categoryList.length > 0) {
			setCategoryId(categoryList[0].value);
		}
	}, [catSuccess]);

	/** -------------------- 2) Sub Categories -------------------- **/
	const { data: subData, isSuccess: subSuccess } = useServiceSubCategory_GetAllQuery(
		{
			skip: 0,
			take: 1000,
			where: { serviceCategory: { id: { eq: categoryId } } },
		},
		{ enabled: !!categoryId }
	);

	const subList =
		subData?.serviceSubCategory_getAll.result?.items?.map((x) => ({
			option: x.name,
			value: x.id,
		})) || [];

	useEffect(() => {
		if (subSuccess && subList.length > 0) {
			setSubId(subList[0].value);
		}
	}, [subSuccess]);

	/** -------------------- 3) Service Types -------------------- **/
	const { data: typeData, isSuccess: typeSuccess } = useServiceTypes_GetAllQuery(
		{
			skip: 0,
			take: 1000,
			where: { serviceSubCategory: { id: { eq: subId } } },
		},
		{ enabled: !!subId }
	);

	const typeList =
		typeData?.serviceTypes_getAll.result?.items?.map((x) => ({
			option: x.name,
			value: x.id,
		})) || [];
	useEffect(() => {
		if (typeList.length > 0) {
			// اگر هنوز مقداری انتخاب نشده بود → مقدار اولیه ست کن
			if (!typeId) {
				const selected = DataRow?.serviceType?.id || typeList[0].value;
				setTypeId(selected);
				onSearchItem(selected);
			}
		}
	}, [typeList]);

	/** -------------------- Handlers -------------------- **/
	const handleCategoryChange = (e: any) => {
		setCategoryId(e.target.value);
		setSubId('');
		setTypeId('');
	};

	const handleSubCategoryChange = (e: any) => {
		setSubId(e.target.value);
		setTypeId('');
	};

	const handleTypeChange = (e: any) => {
		setTypeId(e.target.value);
		onSearchItem(e.target.value);
	};

	/** -------------------- UI -------------------- **/
	const methods = useForm({});

	useEffect(() => {
		if (openModal === true) {
			setOpen(true);
		}
	}, [openModal]);

	return (
		<FormProvider methods={methods}>
			<Grid container spacing={2} dir="rtl">
				{/* Category */}
				<Grid item xs={12} sm={3}>
					<SelectField name="CategoryId" value={categoryId} options={categoryList} onChanged={handleCategoryChange} />
				</Grid>

				{/* SubCategory */}
				<Grid item xs={12} sm={3}>
					<SelectField name="SubCategoryId" value={subId} options={subList} onChanged={handleSubCategoryChange} />
				</Grid>

				{/* ServiceType */}
				<Grid item xs={12} sm={3}>
					<SelectField name="ServiceTypeId" value={typeId} options={typeList} onChanged={handleTypeChange} />
				</Grid>
				<Grid item xs={12} sm={3}>
					<LoadingButton
						variant="contained"
						onClick={() => {
							setDataRow(null);
							setOpen(true);
						}}
						fullWidth
						sx={{
							fontSize: '15px',
							background: '#88b2e1',
							color: '#fff',
							borderRadius: '8px',
							width: 120,
						}}
					>
						جدید
					</LoadingButton>
				</Grid>
			</Grid>

			<Modal
				open={open}
				handleClose={() => {
					setOpen(false);
					onRefreshItem();
				}}
				DataRow={DataRows}
			/>
		</FormProvider>
	);
};

export default Index;
