import React from 'react';
import { Text, View } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import useStateStore from "../Stores/StateStore"
import { HStack } from 'react-native-stacks';

const Counter = ({ variable, onIncrement, onDecrement, disabled }) => {
    const count = useStateStore(state => state[variable]);
    const set = useStateStore(state => state.set);

    const handleIncrement = () => {
        if (!disabled) {
            set({ [variable]: count + 1 });
            if (onIncrement) onIncrement(count + 1);
        }
    };

    const handleDecrement = () => {
        if (!disabled && count > 0) {
            set({ [variable]: count - 1 });
            if (onDecrement) onDecrement(count - 1);
        }
    };

    return (
        <HStack>
            <FontAwesome6 name="minus" size={32} onPress={handleDecrement} color={disabled ? 'gray' : 'red'} />
            <Text style={{ width: 75, textAlign: 'center', fontSize: 24 }}>  {count}  </Text>
            <FontAwesome6 name="plus" size={32} onPress={handleIncrement} color={disabled ? 'gray' : 'green'} />
        </HStack>
    );
};

export default Counter;