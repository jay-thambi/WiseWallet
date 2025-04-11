import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Svg, { Circle, Path } from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BudgetCircle = ({ totalBudget, segments, totalSpent }) => {
  const radius = 80;
  const strokeWidth = 20;
  const center = radius + strokeWidth;

  // Get the color from the first segment
  const segment = segments && segments[0];
  const categoryColor = segment ? segment.color : '#E5E5E5';

  // Check if overspent
  const isOverspent = totalSpent > totalBudget && totalBudget > 0;

  // Calculate the spent percentage for the progress arc
  // Cap at 100% for visual display but still show actual amount
  const spentPercentage = Math.min(totalBudget > 0 ? (totalSpent / totalBudget) : 0, 1);
  const spentAngle = isOverspent ? 360 : (spentPercentage * 360);

  // SVG arc calculation
  const startAngle = -90; // Start from top
  const endAngle = startAngle + spentAngle;
  const largeArcFlag = spentAngle > 180 ? 1 : 0;

  // Calculate start and end points
  const startX = center + radius * Math.cos(startAngle * Math.PI / 180);
  const startY = center + radius * Math.sin(startAngle * Math.PI / 180);
  const endX = center + radius * Math.cos(endAngle * Math.PI / 180);
  const endY = center + radius * Math.sin(endAngle * Math.PI / 180);

  // Create the arc path
  const arcPath = `
    M ${center} ${center}
    L ${startX} ${startY}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
    L ${center} ${center}
  `;

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <View style={styles.chartWrapper}>
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

            {/* Spent amount segment */}
            {totalSpent > 0 && totalBudget > 0 && (
              <Path
                d={arcPath}
                fill={isOverspent ? '#FF6B6B' : categoryColor}
                fillOpacity={1}
                stroke="white"
                strokeWidth={1}
              />
            )}
          </Svg>
        </View>

        <View style={styles.budgetInfo}>
          <Text style={styles.spentLabel}>Spent</Text>
          <Text style={[
            styles.spentAmount,
            isOverspent && styles.overspentAmount
          ]}>${totalSpent || 0}</Text>
          <Text style={styles.totalAmount}>of ${totalBudget || 0}</Text>
        </View>
      </View>

      {isOverspent && (
        <View style={styles.overspentContainer}>
          <MaterialCommunityIcons name="alert-circle" size={20} color="#FF6B6B" />
          <Text style={styles.overspentText}>Budget exceeded!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 20,
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  budgetInfo: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  spentLabel: {
    fontSize: 14,
    color: '#666',
  },
  spentAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 4,
  },
  overspentAmount: {
    color: '#FF6B6B',
  },
  totalAmount: {
    fontSize: 14,
    color: '#666',
  },
  overspentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#FFE5E5',
    padding: 8,
    borderRadius: 8,
    gap: 8,
  },
  overspentText: {
    color: '#FF6B6B',
    fontWeight: '500',
  },
});

export default BudgetCircle; 