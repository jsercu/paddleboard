import React, { useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ReactComponent as SelectorIcon } from '../../assets/img/icons/selector-20.svg';
import { ReactComponent as CheckIcon } from '../../assets/img/icons/check-20.svg';

const SelectInput = ({ name, labelText, placeholderText, options, handleSelectInputChange }) => {
  const [selectedOption, setSelectedOption] = useState(false);

  useEffect(() => {
    handleSelectInputChange(name, selectedOption);
  }, [selectedOption]);

  return (
    <Listbox as="div" className="space-y-1" value={selectedOption} onChange={setSelectedOption}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700 leading-5">{labelText}:</Listbox.Label>
          <div className="relative">
            <span className="z-40 inline-block w-full rounded-sm shadow-sm">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-sm cursor-default focus:bg-white focus:outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                {selectedOption ? (
                  <span className="block truncate">{selectedOption}</span>
                ) : (
                  <span className="block text-gray-400 truncate">{placeholderText || 'None Selected'}</span>
                )}
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon className="w-5 h-5 text-gray-400" />
                </span>
              </Listbox.Button>
            </span>

            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="absolute z-50 w-full mt-1 bg-white shadow-lg rounded-md">
              <Listbox.Options
                static
                className="py-1 overflow-auto text-base max-h-60 rounded-md leading-6 shadow-xs focus:outline-none sm:text-sm sm:leading-5">
                {options.map(({ name, id }, index) => (
                  <Listbox.Option key={id ? id : index} value={name}>
                    {({ selected, active }) => (
                      <div
                        className={`${
                          active ? 'text-white bg-indigo-600' : 'text-gray-900'
                        } cursor-default select-none relative py-2 pl-8 pr-4`}>
                        <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>{name}</span>
                        {selected && (
                          <span
                            className={`${
                              active ? 'text-white' : 'text-indigo-600'
                            } absolute inset-y-0 left-0 flex items-center pl-1.5`}>
                            <CheckIcon className="w-5 h-5" />
                          </span>
                        )}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default SelectInput;
