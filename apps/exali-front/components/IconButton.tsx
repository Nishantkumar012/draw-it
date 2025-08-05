import {LineChart} from 'lucide-react';
import {ReactNode} from 'react';

export function IconButton({icon, onClick, activated
}: {
     icon: ReactNode,
     onClick: () => void,
     activated?: boolean,
}) {
     // console.log('IconButton activated:', activated);

     return (
          <div
               onClick={onClick}
               className={`pointer rounded-full border p-1 bg-black hover:bg-gray ${activated ? "text-red-500" : "text-white"}`}
          > 
               {icon}
          </div>
     );
}
