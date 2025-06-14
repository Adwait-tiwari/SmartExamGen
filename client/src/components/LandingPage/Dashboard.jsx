import Navbar from "../header/Navbar";
import { useFormData } from "../../context/FormDataContext";
import Card from "../card/Card";

function Dashboard() {
  const { formDataList } = useFormData();

  return (
    <>
      <Navbar />
      <div className="p-6">
        {formDataList && formDataList.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {formDataList.map((data, index) => (
              <Card
                key={index}
                subject={data.subject}
                questionNumber={data.questionNumber}
                difficulty={data.difficulty}
                questionTypes={data.questionTypes}
              />
            ))}
          </div>
        ) : (
          <p>No form data available. Please go back and submit the form.</p>
        )}
      </div>
    </>
  );
}

export default Dashboard;
