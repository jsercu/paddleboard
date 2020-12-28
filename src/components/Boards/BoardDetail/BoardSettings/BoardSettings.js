import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import IconButton from '../../../../common/Buttons/IconButton';
import Input from '../../../../common/Inputs/Input';
import TextArea from '../../../../common/Inputs/TextArea';
import Button from '../../../../common/Buttons/Button';
import { ReactComponent as XIcon } from '../../../../assets/img/icons/x-24.svg';

const BoardSettings = ({ toggleShowBoardSettings }) => {
  const [values, setValues] = useState({ name: '', description: '' });
  const handleClick = () => {
    toggleShowBoardSettings();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-30 overflow-hidden">
      <section className="absolute inset-0 flex max-w-full">
        <div className="flex flex-col w-full h-full overflow-y-scroll bg-white">
          <div className="relative">
            <div className="absolute top-0 right-0 p-12">
              <IconButton ariaLabel="Close Panel" action={handleClick} backgroundType="white">
                <XIcon title="x-icon" className="w-6 h-6" />
              </IconButton>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex-col max-w-4xl">
              <div className="py-16 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Board Settings</h2>
                  <h5 className="font-normal text-gray-500 text-md">
                    View and edit information for this board, add participants, and other options...
                  </h5>
                </div>
                <form className={`h-full flex flex-col space-y-6`}>
                  <div>
                    <Input
                      labelText="Name"
                      ariaLabel="Name"
                      name="name"
                      value={values.name}
                      type="text"
                      isRequired
                      changeHandler={handleInputChange}
                      inputStyle="fullWidth"
                    />
                  </div>
                  <div>
                    <TextArea
                      labelText="Description"
                      ariaLabel="Description"
                      name="description"
                      value={values.description}
                      rows="5"
                      changeHandler={handleInputChange}
                      inputStyle="fullWidth"
                    />
                  </div>
                  <div className="flex flex-row-reverse space-x-4 space-x-reverse">
                    <Button type="submit" color="primary" size="medium" text="Save Changes" />
                    <Button type="button" color="tertiary" size="medium" text="Cancel" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>,
    document.getElementById('modal-root'),
  );
};

export default BoardSettings;
