import { useParams } from "react-router-dom";

function ProductDetailView() {
  const params = useParams();
  console.log(params);
  
  return (
    <>
      <h1>details</h1>
      <div>
      </div>
    </>
  );
}

export default ProductDetailView;
