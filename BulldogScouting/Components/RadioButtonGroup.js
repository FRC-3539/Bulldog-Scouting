import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import RadioButton from './RadioButton';

const RadioButtonGroup = ({ children, selected = '', onChange = () => { }, disabled = false, containerStyle = {} }) => {
    const handleChange = (value) => {
        if (!disabled) {
            onChange(value);
        }
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {React.Children.map(children, (child) =>
                React.cloneElement(child, {
                    selected,
                    onChange: handleChange,
                    disabled,
                })
            )}
        </View>
    );
};

RadioButtonGroup.propTypes = {
    children: PropTypes.node.isRequired,
    selected: PropTypes.any,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    containerStyle: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default RadioButtonGroup;
