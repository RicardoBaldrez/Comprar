import { View, Text, TouchableOpacity } from 'react-native';

import { Trash2 } from 'lucide-react-native';

import { FilterStatus } from '@/types/FilterStatus';

import { StatusIcon } from '../StatusIcon';
import { styles } from './styles';

type ItemDataProps = {
	status: FilterStatus;
	description: string;
};

type Props = {
	data: ItemDataProps;
	onStatus: () => void;
	onRemove: () => void;
};

export function ListItem({ data, onStatus, onRemove }: Props) {
	return (
		<View style={styles.container}>
			<TouchableOpacity activeOpacity={0.8} onPress={onStatus}>
				<StatusIcon status={data.status} />
			</TouchableOpacity>
			<Text style={styles.description}>{data.description}</Text>
			<TouchableOpacity onPress={onRemove}>
				<Trash2 size={18} color="#828282" />
			</TouchableOpacity>
		</View>
	);
}
