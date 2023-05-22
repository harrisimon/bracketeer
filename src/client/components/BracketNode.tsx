import BracketLeaf from './BracketLeaf';

interface NodeProps {
  data: {
    left: {
      name: string;
      votes: number;
    };
    right: {
      name: string;
      votes: number;
    };
  };
}
const BracketNode = (props: NodeProps) => {
  const { data } = props;

  return (
    <div>
      <BracketLeaf name={data.left.name} votes={data.left.votes} />
      <BracketLeaf name={data.right.name} votes={data.right.votes} />
    </div>
  );
};

export default BracketNode;
