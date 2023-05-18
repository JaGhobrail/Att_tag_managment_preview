import { useEffect, useState } from 'react';

const Notifications = ({ interviews }) => {
  const [upcomingInterview, setUpcomingInterview] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const upcoming = interviews.find((interview) => {
        const interviewTime = new Date(`${interview.date}T${interview.time}`);
        const diff = interviewTime - now;
        return diff > 0 && diff < 300000; // Return interviews that start within the next 5 minutes
      });

      setUpcomingInterview(upcoming);
    }, 1000); // Run every 1 second

    return () => {
      clearInterval(intervalId);
    };
  }, [interviews]);

  return (
    <>
      {upcomingInterview && (
        <div className="fixed bottom-0 right-0 mb-4 mr-4 p-4 bg-white rounded-lg shadow-lg">
          <p className="font-bold text-lg">
            Your interview with {upcomingInterview.interviewer} is starting soon!
          </p>
          <p className="text-gray-600">
            {upcomingInterview.date} at {upcomingInterview.time}
          </p>
        </div>
      )}
    </>
  );
};

export default Notifications;
