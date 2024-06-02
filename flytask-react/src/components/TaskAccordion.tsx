import React from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { BiChevronDown } from 'react-icons/bi';
import { Task } from '../utils/types';

type AccordionProps = {
  title: string;
  tasks: Task[];
  statusColor: string
};

export const TaskAccordion: React.FC<AccordionProps> = ({ title, tasks, statusColor }) => {
  return (
    <div className="w-full bg-white rounded-2xl">
      <Disclosure>
        {({ open }) => (
          <>
            <DisclosureButton className="flex justify-between items-center w-full px-4 py-2 m-2text-sm font-medium text-left text-black bg-white rounded-lg hover:bg-mint focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span className={`p-2 ${statusColor} rounded-md`} >{title}</span>
              <BiChevronDown
                className={`${
                  open ? 'transform rotate-180' : ''
                } w-5 h-5 text-purple-500`}
              />
            </DisclosureButton>
            <DisclosurePanel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              {tasks.map((task, index) => (
                <div key={index} className="mt-2">
                  <div className="font-medium">{task.title}</div>
                  <div>{task.description}</div>
                </div>
              ))}
              <div className="flex justify-end">
              <div className="flex justify-around w-1/2 p-2 ">
                <button className='p-2 bg-charcoal text-white rounded-md w-2/5'>Move task</button>
                <button className='p-2 bg-yellow text-white rounded-md w-2/5'>Add task</button>
              </div>
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default TaskAccordion;

