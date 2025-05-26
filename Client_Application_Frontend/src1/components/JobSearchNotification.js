import React from 'react';

const JobSearchNotification = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-6 text-center">
        <p className="text-gray-600 mb-4">
          Can not find the job you are looking for? Click below to receive notifications when a suitable job is posted.
        </p>
        <button className="bg-purple-600 text-white rounded-md px-6 py-3 hover:bg-purple-700">
          Notify me of jobs
        </button>
      </div>
    </section>
  );
};

export default JobSearchNotification;
