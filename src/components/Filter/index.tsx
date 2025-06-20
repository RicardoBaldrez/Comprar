import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { StatusIcon } from '@/components/StatusIcon';

import { FilterStatus } from '@/types/FilterStatus';

import { styles } from './styles';

type FilterProps = TouchableOpacityProps & {
	status: FilterStatus;
	isActive: boolean;
};

export function Filter({ status, isActive, ...rest }: FilterProps) {
	return (
		<TouchableOpacity
			{...rest}
			activeOpacity={0.8}
			style={[styles.container, { opacity: isActive ? 1 : 0.5 }]}
		>
			<StatusIcon status={status} />
			<Text style={styles.title}>
				{status === FilterStatus.DONE ? 'Comprados' : 'Pendentes'}
			</Text>
		</TouchableOpacity>
	);
}
