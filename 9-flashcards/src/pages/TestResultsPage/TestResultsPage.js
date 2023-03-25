import { useSelector } from "react-redux";

function TestResultsPage() {
  const test = useSelector((state) => state.test);

  return <h1>{`${test.correct.length}/${test.numCards}`}</h1>;
}

export default TestResultsPage;
