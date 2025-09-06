// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import { FormProvider as Form } from 'react-hook-form';

type FormProviderType = React.PropsWithChildren & {
	methods: object;
};

export default function FormProvider({ children, methods }: FormProviderType) {
	return <Form {...methods}>{children}</Form>;
}
