import React from 'react';

const BoardsList = () => {
  return (
    <div className={`flex flex-col`}>
      <div className={`-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8`}>
        <div className={`inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8`}>
          <div className={`overflow-hidden border border-gray-300 shadow-sm sm:rounded-md`}>
            <table className={`min-w-full divide-y divide-gray-200`}>
              <thead className={`bg-gray-50`}>
                <tr>
                  <th
                    scope="col"
                    className={`px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase`}>
                    Name
                  </th>
                  <th
                    scope="col"
                    className={`px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase`}>
                    Title
                  </th>
                  <th
                    scope="col"
                    className={`px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase`}>
                    Status
                  </th>
                  <th
                    scope="col"
                    className={`px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase`}>
                    Role
                  </th>
                  <th scope="col" className={`relative px-6 py-3`}>
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className={`bg-white divide-y divide-gray-200`}>
                <tr>
                  <td className={`px-6 py-4 whitespace-nowrap`}>
                    <div className={`flex items-center`}>
                      <div className={`flex-shrink-0 w-10 h-10`}>
                        <img
                          className={`w-10 h-10 rounded-full`}
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
                          alt=""
                        />
                      </div>
                      <div className={`ml-4`}>
                        <div className={`text-sm font-medium text-gray-900`}>Jane Cooper</div>
                        <div className={`text-sm text-gray-500`}>jane.cooper@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap`}>
                    <div className={`text-sm text-gray-900`}>Regional Paradigm Technician</div>
                    <div className={`text-sm text-gray-500`}>Optimization</div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap`}>
                    <span
                      className={`inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full leading-5`}>
                      Active
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-sm text-gray-500 whitespace-nowrap`}>Admin</td>
                  <td className={`px-6 py-4 text-sm font-medium text-right whitespace-nowrap`}>
                    <a href="#" className={`text-indigo-600 hover:text-indigo-900`}>
                      Edit
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardsList;
