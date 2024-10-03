const CourseIdPage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  console.log("PARAMS : ", params.id);

  return <div className="">CourseId_Page : {params.id} </div>;
};

export default CourseIdPage;
