import { useParams } from "react-router-dom";

const UpdateForm = () => {
  const { id } = useParams();

  console.log(id);

  return (
    <div>
      Update Form {id}
    </div>
  );
};

export default UpdateForm;