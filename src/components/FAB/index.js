import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  Animated,
  Easing,
} from 'react-native';
import { Touchable } from './src';
import { noop } from './src/utils';
import styles from '../../style/styles';

const sharpEasingValues = {
  entry: Easing.bezier(0.0, 0.0, 0.2, 1),
  exit: Easing.bezier(0.4, 0.0, 0.6, 1),
};

const durationValues = {
  entry: 225,
  exit: 195,
};

const moveEasingValues = {
  entry: Easing.bezier(0.0, 0.0, 0.2, 1),
  exit: Easing.bezier(0.4, 0.0, 1, 1),
};


export default class FAB extends Component {
  static propTypes = {
    buttonColor: PropTypes.string,
    iconTextColor: PropTypes.string,
    onClickAction: PropTypes.func,
    iconTextComponent: PropTypes.element,
    visible: PropTypes.bool,
    snackOffset: PropTypes.number,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };

  static defaultProps = {
    buttonColor: 'red',
    iconTextColor: '#FFFFFF',
    onClickAction: noop,
    iconTextComponent: <Text>+</Text>,
    visible: true,
    snackOffset: 0,
    style: {},
  };

  state = {
    translateValue: new Animated.Value(0),
    shiftValue: new Animated.Value(0),
  };

  componentDidMount() {
    const { translateValue, shiftValue } = this.state;
    const { visible, snackOffset } = this.props;

    if (visible) {
      translateValue.setValue(1);
    } else {
      translateValue.setValue(0);
    }
    if (snackOffset === 0) {
      shiftValue.setValue(20);
    } else {
      shiftValue.setValue(20 + snackOffset);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { translateValue, shiftValue } = this.state;
    const { visible, snackOffset } = this.props;

    if (nextProps.visible && !visible) {
      Animated.timing(
        translateValue,
        {
          duration: durationValues.entry,
          toValue: 1,
          easing: sharpEasingValues.entry,
        },
      ).start();
    } else if (!nextProps.visible && visible) {
      Animated.timing(
        translateValue,
        {
          duration: durationValues.exit,
          toValue: 0,
          easing: sharpEasingValues.exit,
        },
      ).start();
    }
    if (nextProps.snackOffset !== snackOffset) {
      if (nextProps.snackOffset === 0) {
        Animated.timing(
          shiftValue,
          {
            duration: durationValues.exit,
            toValue: 20,
            easing: moveEasingValues.exit,
          },
        ).start();
      } else if (nextProps.snackOffset !== 0) {
        Animated.timing(
          shiftValue,
          {
            duration: durationValues.entry,
            toValue: 20 + nextProps.snackOffset,
            easing: moveEasingValues.entry,
          },
        ).start();
      }
    }
  }

  render() {
    const {
      translateValue, shiftValue,
    } = this.state;
    const {
      onClickAction,
      buttonColor,
      iconTextComponent,
      iconTextColor,
      style,
    } = this.props;

    const dimensionInterpolate = translateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 56],
    });

    const rotateInterpolate = translateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['-90deg', '0deg'],
    });

    return (
      <Animated.View style={[styles.fabContainer, { bottom: shiftValue }]}>
        <Animated.View
          style={[
            styles.addButton, {
              height: dimensionInterpolate,
              width: dimensionInterpolate,
            },
          ]}
        >
          <Touchable
            onPress={onClickAction}
            style={[styles.addButtonInnerContainer, style]}
            buttonColor={buttonColor}
          >
            <Animated.View
              style={{
                transform: [
                  { scaleX: translateValue },
                  { rotate: rotateInterpolate },
                ],
              }}
            >
              {React.cloneElement(iconTextComponent, {
                style: {
                  fontSize: 35,
                  color: iconTextColor,
                },
              })}
            </Animated.View>
          </Touchable>
        </Animated.View>
      </Animated.View>
    );
  }
}
