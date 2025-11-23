import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useServiceCategory_GetAllQuery, useServiceSubCategory_GetAllQuery } from 'src/graphql/generated';

import { FormProvider, SelectField, useForm } from '@/components/atoms/Form';

import Modal from './ModalInsert';
import { IPageProps } from './type-page';

const Index: FC<IPageProps> = ({ DataRow, onRefreshItem, onSearchItem, openModal }) => {
	const [open, setOpen] = useState(false);
	const [DataRows, setDataRow] = useState<any>(null);

	const [categoryId, setCategoryId] = useState('');
	const [subCategoryId, setSubCategoryId] = useState('');

	const [categoryList, setCategoryList] = useState([]);
	const [subCategoryList, setSubCategoryList] = useState([]);
	const [loadSub, setLoadSub] = useState(false);

	// بارگذاری DataRow
	useEffect(() => {
		setDataRow(DataRow);
	}, [DataRow]);

	useEffect(() => {
		if (openModal === true) {
			setOpen(true);
		}
	}, [openModal]);
	// -------------------- Categories --------------------
	const { data: catData, isSuccess: catSuccess } = useServiceCategory_GetAllQuery(
		{ skip: 0, take: 1000 },
		{ keepPreviousData: true }
	);

	useEffect(() => {
		if (catSuccess) {
			const list =
				catData?.serviceCategory_getAll.result?.items?.map((cat) => ({
					option: cat.name,
					value: cat.id,
				})) || [];

			if (list.length > 0) {
				setCategoryList(list);
				setCategoryId(list[0].value); // مقدار اولیه
			}
		}
	}, [catSuccess, catData]);

	// -------------------- SubCategories --------------------
	const { data: subData, isSuccess: subSuccess } = useServiceSubCategory_GetAllQuery(
		{
			skip: 0,
			take: 1000,
			where: { serviceCategory: { id: { eq: categoryId } } },
		},
		{
			keepPreviousData: true,
			enabled: loadSub,
		}
	);

	useEffect(() => {
		if (subSuccess) {
			const list =
				subData?.serviceSubCategory_getAll.result?.items?.map((sub) => ({
					option: sub.name,
					value: sub.id,
				})) || [];

			if (list.length > 0) {
				setSubCategoryList(list);
				setSubCategoryId(list[0].value); // مقدار اولیه
				onSearchItem(list[0].value);
			}
		}
	}, [subSuccess, subData]);

	// لود SubCategory وقتی Category انتخاب شد
	useEffect(() => {
		if (categoryId) setLoadSub(true);
	}, [categoryId]);

	// -------------------- Handlers --------------------
	const handleCategoryChange = (e: any) => {
		const val = e.target.value;
		setCategoryId(val);
		setSubCategoryId('');
		setSubCategoryList([]);
		setLoadSub(true);
		onSearchItem(val);
	};

	const handleSubCategoryChange = (e: any) => {
		const val = e.target.value;
		setSubCategoryId(val);
		onSearchItem(val);
	};

	// -------------------- Form --------------------
	const methods = useForm({});

	return (
		<FormProvider methods={methods}>
			<Grid container spacing={2} dir="rtl" alignItems="center">
				{/* Category */}
				<Grid item xs={12} sm={3}>
					<SelectField name="CategoryId" options={categoryList} value={categoryId} onChanged={handleCategoryChange} />
				</Grid>

				{/* SubCategory */}
				<Grid item xs={12} sm={3}>
					<SelectField
						name="SubCategoryId"
						options={subCategoryList}
						value={subCategoryId}
						onChanged={handleSubCategoryChange}
					/>
				</Grid>

				{/* دکمه جدید */}
				<Grid item xs={12} sm={3}>
					<LoadingButton
						variant="contained"
						onClick={() => {
							setDataRow(null);
							setOpen(true);
						}}
						fullWidth
						sx={{
							fontSize: 15,
							background: '#88b2e1',
							color: '#fff',
							borderRadius: '8px',
							width: 100,
							marginTop: 1,
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
