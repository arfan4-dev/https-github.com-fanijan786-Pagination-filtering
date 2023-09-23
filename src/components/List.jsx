import React from 'react';

function List({ data, keyword }) {
  function highlightKeyword(title, keyword) {
    const regex = new RegExp(`(${keyword})`, 'gi');
    return title.replace(regex, '<span class="bg-yellow-200">$1</span>');
  }
  return (
    <ul  className="bg-white border rounded shadow divide-y divide-gray-200">
      {data.map((item) => (
        <li key={item.id}  className="px-4 py-3">
          <span
            dangerouslySetInnerHTML={{
              __html: keyword
                ? highlightKeyword(item.title, keyword)
                : item.title,
            }}
          />
        </li>
      ))}
    </ul>
  );
}

export default List;
