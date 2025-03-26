import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Svg, { Circle, Path, G } from 'react-native-svg';

const BudgetCircle = ({ totalBudget, segments }) => {
  const radius = 80;
  const strokeWidth = 20;
  const center = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;
  
  let startAngle = 0;
  const total = segments.reduce((sum, segment) => sum + segment.amount, 0);

  return (
    <View style={styles.container}>
      <Svg
        width={center * 2}
        height={center * 2}
        viewBox={`0 0 ${center * 2} ${center * 2}`}
      >
        {/* Background circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#E5E5E5"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Budget segments */}
        {segments.map((segment, index) => {
          const percentage = segment.amount / total;
          const angle = percentage * 360;
          const sweepFlag = angle <= 180 ? 0 : 1;
          
          // Calculate start and end points
          const x1 = center + radius * Math.cos((startAngle - 90) * Math.PI / 180);
          const y1 = center + radius * Math.sin((startAngle - 90) * Math.PI / 180);
          const x2 = center + radius * Math.cos((startAngle + angle - 90) * Math.PI / 180);
          const y2 = center + radius * Math.sin((startAngle + angle - 90) * Math.PI / 180);

          const pathData = `
            M ${center} ${center}
            L ${x1} ${y1}
            A ${radius} ${radius} 0 ${sweepFlag} 1 ${x2} ${y2}
            L ${center} ${center}
          `;

          startAngle += angle;

          return (
            <Path
              key={index}
              d={pathData}
              fill={segment.color}
              stroke="white"
              strokeWidth={1}
            />
          );
        })}
        
        {/* Center text */}
        <G>
          <Text
            x={center}
            y={center - 10}
            textAnchor="middle"
            fill="#000"
            fontSize="14"
          >
            Budget
          </Text>
          <Text
            x={center}
            y={center + 10}
            textAnchor="middle"
            fill="#000"
            fontSize="16"
            fontWeight="bold"
          >
            ${totalBudget}
          </Text>
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default BudgetCircle; 