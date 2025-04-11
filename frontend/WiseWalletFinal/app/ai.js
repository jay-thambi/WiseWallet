import AIScreen from '../src/screens/AIScreen';
import { useGlobalState } from '../src/context/GlobalStateContext';

export default function AI() {
    const { budgets, goals } = useGlobalState();
    return <AIScreen budgets={budgets} goals={goals} />;
} 