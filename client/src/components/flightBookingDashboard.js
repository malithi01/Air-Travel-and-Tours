// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { motion } from "framer-motion";

// const airlines = [
//   {
//     name: "Emirates",
//     image:
//       "https://i.pinimg.com/736x/3c/cb/2e/3ccb2e17f7110efe044513a9da1cc1ed.jpg", // Replace with actual image URL
//     description:
//       "Experience luxury and comfort with Emirates flights worldwide.",
//   },
//   {
//     name: "Qatar Airways",
//     image:
//       "https://i.pinimg.com/736x/3c/cb/2e/3ccb2e17f7110efe044513a9da1cc1ed.jpg", // Replace with actual image URL
//     description: "Fly with Qatar Airways for exceptional service and quality.",
//   },
//   {
//     name: "Singapore Airlines",
//     image:
//       "https://i.pinimg.com/736x/3c/cb/2e/3ccb2e17f7110efe044513a9da1cc1ed.jpg", // Replace with actual image URL
//     description: "Award-winning in-flight experience awaits you.",
//   },
// ];

// export default function FlightDashboard() {
//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-center mb-6">
//         Flight Booking Dashboard
//       </h1>
//       <div className="grid md:grid-cols-3 gap-6">
//         {airlines.map((airline, index) => (
//           <motion.div key={index} whileHover={{ scale: 1.05 }} className="p-4">
//             <Card className="rounded-2xl overflow-hidden shadow-lg">
//               <img
//                 src={airline.image}
//                 alt={airline.name}
//                 className="w-full h-40 object-cover"
//               />
//               <CardContent className="p-4">
//                 <h2 className="text-xl font-semibold">{airline.name}</h2>
//                 <p className="text-gray-600 mt-2">{airline.description}</p>
//               </CardContent>
//             </Card>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }
