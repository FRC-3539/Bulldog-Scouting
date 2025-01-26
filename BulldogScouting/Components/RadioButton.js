import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import PropTypes from 'prop-types';

const RadioButton = ({
    value,
    selected = '',
    onChange = () => { },
    color = 'black',
    label = '',
    disabled = false,
    size = 24,
    textColor = 'black'
}) => {
    const handleClick = () => {
        if (!disabled) {
            onChange(value);
        }
    };

    return (
        <TouchableOpacity
            onPress={handleClick}
            style={[styles.container, { opacity: disabled ? 0.5 : 1 }]}
            disabled={disabled}
        >
            <Svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
            >
                <Circle cx="12" cy="12" r="11" stroke={'gray'} strokeWidth="2" fill="none" />
                {selected === value && (
                    <Circle cx="12" cy="12" r="7" fill={color} />
                )}
            </Svg>
            <Text style={[styles.label, { color: disabled ? 'gray' : textColor, marginLeft: 8 }]}>{label}</Text>
        </TouchableOpacity>
    );
};

RadioButton.propTypes = {
    value: PropTypes.any.isRequired,
    selected: PropTypes.any,
    onChange: PropTypes.func,
    color: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    size: PropTypes.number,
    textColor: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        cursor: 'pointer',
    },
    label: {
        fontSize: 16,
    },
});

export default RadioButton;