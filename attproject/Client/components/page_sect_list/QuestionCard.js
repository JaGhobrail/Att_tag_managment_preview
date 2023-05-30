
import { useState, useEffect } from "react";
import Link from 'next/link';
export default function QuestionCard({ question }) {
    const [isopen, setIsOpen] = useState(false);
    const openTab = (e) =>
        setIsOpen(!isopen);
    return (
        <>

            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {question?.id}
            </th>
            <td class="px-6 py-4">
                {question?.title}
            </td>
            <td class="px-6 py-4">
                {question?.invest_level}
            </td>
            <td class="px-6 py-4">
                {question?.invest_version}
            </td>
            <td class="px-6 py-4">
                {question?.scan_year}
            </td>
            <td class="px-6 py-4">
                {question?.scan_month}
            </td>

            <td class="px-6 py-4 text-sm font-medium  text-center whitespace-no-wrap border-b border-gray-200 ">
                <a href="#" class="text-indigo-600 hover:text-indigo-900">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </a>
                <a href="#" class="text-gray-600 hover:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </a>
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-600 hover:text-red-800"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg></a>

            </td>


        </>
    );
}
