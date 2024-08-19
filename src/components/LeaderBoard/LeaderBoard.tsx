import React, { useState, useEffect } from "react";
import "./LeaderBoard.css";
import Navbar from "../Navbar/Navbar";

type Props = {};

// const dummyData = [
//   {
//     gameId: 1,
//     userName: "Aman",
//     Email: "Aman@gmail.com",
//     status: "Inactive",
//     reqStatus: "Send",
//     wins: "10",
//   },
//   {
//     gameId: 2,
//     userName: "Omkar",
//     Email: "Omkar@gmail.com",
//     status: "Active",
//     reqStatus: "Send",
//     wins: "8",
//   },
//   {
//     gameId: 3,
//     userName: "Subrat",
//     Email: "Subrat@gmail.com",
//     status: "Inactive",
//     reqStatus: "Sent",
//     wins: "7",
//   },
//   {
//     gameId: 4,
//     userName: "Me",
//     Email: "Me@gmail.com",
//     status: "Inactive",
//     reqStatus: "Send",
//     wins: "6",
//   },
//   {
//     gameId: 5,
//     userName: "Kundan",
//     Email: "Kundan@gmail.com",
//     status: "Active",
//     reqStatus: "Sent",
//     wins: "5",
//   },
// ];

const LeaderBoard = (props: Props) => {
  const [friendName, setFriendName] = useState("");
  const [friendsList, setFriendsList] = useState([]);

  const handleSubmitClick = () => {
    if (friendName != "") {
      const results = friendsList.filter((item) => {
        return (
          item.playerUsername != null &&
          item.playerUsername.toLowerCase().startsWith(friendName.toLowerCase())
        );
      });
      //Setting the new Filtered out Data in the State
      setFriendsList(results);
    } else {
      //fetch friends list
      fetchLeaderBoard();
      setFriendsList(friendsList);
    }
  };

  const fetchLeaderBoard = async () => {
    console.log("Inside fetchLeaderBoard Function");

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const data = await fetch(
      "http://localhost:3000/Leaderboard/FetchLeaderboard",
      {
        method: "GET",
        redirect: "follow",
        credentials: "include", // Don't forget to specify this if you need cookies
        headers: headers,
      }
    );

    const res = await data.json();
    console.log("LeaderBoard Array from backend is :", res);

    //setting the data
    setFriendsList(res.arrayOfPlayers);
  };

  useEffect(() => {
    //fetching the leaderboard from the backend
    fetchLeaderBoard();
  }, []);

  // return (
  //   <div className='bg-slate-800 mainFriendsPage'>
  //       <div className='ballOne rounded-full w-[70vh] h-[90vw] ml-[-20vw] mb-[-20vw] bg-pink-500 blur-3xl opacity-70'></div>
  //       <div className='ballTwo rounded-full w-[60vh] h-[80vw] mr-[-50vh] bg-blue-500 blur-3xl opacity-70'></div>

  //       <div className='mainFriendsManagementDiv'>

  //         <div className='friendsManagementLeftSide'>
  //           <div className='searchFriends'>
  //                   <h1 className='friendListHeader text-5xl  text-white'>My Friends List</h1>
  //                   <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
  //                   <div className="relative">
  //                       <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
  //                           <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
  //                               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
  //                           </svg>
  //                       </div>
  //                       <input onChange={(e)=>setFriendName(e.target.value)} type="search" id="default-search" className="max-w-screen-lg w-[600px] block p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Friend Name" required/>
  //                       <button onClick={()=>{handleSubmitClick()}} type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search/ViewAll</button>
  //                   </div>
  //             </div>

  //             <div className='friendsListComponent'>
  //               <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">

  //                 <div className="overflow-y-hidden rounded-lg border">
  //                   <div className="overflow-x-auto">
  //                     <table className="w-full">
  //                       <thead>
  //                         <tr className="bg-black text-center text-xs font-semibold uppercase tracking-widest text-white">
  //                           <th className="px-5 py-3">GAME ID</th>
  //                           <th className="px-5 py-3">Username</th>
  //                           <th className="px-5 py-3">Email</th>
  //                           <th className="px-5 py-3">Status</th>
  //                           <th className="px-5 py-3">Remove Friend</th>
  //                         </tr>
  //                       </thead>

  //                       <tbody className="text-white">
  //                         {
  //                           friendsList.map((item)=>{
  //                             return (
  //                                 <tr>
  //                                   <td className="border-b border-gray-200 bg-none px-5 py-5 text-sm">
  //                                     <p className="whitespace-no-wrap">{item.gameId}</p>
  //                                   </td>
  //                                   <td className="border-b border-gray-200 bg-none px-5 py-5 text-sm">
  //                                     <div className="flex items-center">
  //                                       <div className="h-10 w-10 flex-shrink-0">
  //                                         <img className="h-full w-full rounded-full" src={randomPerson} alt="" />
  //                                       </div>
  //                                       <div className="ml-3">
  //                                         <p className="whitespace-no-wrap">{item.userName}</p>
  //                                       </div>
  //                                     </div>
  //                                   </td>
  //                                   <td className="border-b border-gray-200 bg-none px-5 py-5 text-sm">
  //                                     <p className="whitespace-no-wrap">{item.Email}</p>
  //                                   </td>
  //                                   <td className="border-b border-gray-200 bg-none px-5 py-5 text-sm">
  //                                     <span className={`rounded-full ${item.status=='Active'?'bg-green-200':'bg-red-200'} px-3 py-1 text-xs font-semibold ${item.status=='Active'?'text-green-900':'text-red-900'}`}>{item.status}</span>
  //                                   </td>
  //                                   <td className="px-6 py-4 border-b">
  //                                       <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
  //                                   </td>
  //                               </tr>
  //                             )
  //                           })
  //                         }

  //                       </tbody>

  //                     </table>
  //                   </div>
  //                 </div>
  //               </div>

  //           </div>

  //         </div>

  //         <div className='friendsManagementRightSide'>
  //         <div className='searchFriends'>
  //                   <h1 className='friendListHeader text-5xl  text-white'>Add friend</h1>
  //                   <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
  //                   <div className="relative">
  //                       <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
  //                           <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
  //                               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
  //                           </svg>
  //                       </div>
  //                       <input onChange={(e)=>setFriendName(e.target.value)} type="search" id="default-search" className="max-w-full w-[400px] block p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Friend" required/>
  //                       <button onClick={()=>{handleSubmitClick()}} type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
  //                   </div>
  //             </div>

  //             <div className='friendsListComponent'>
  //               <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">

  //                 <div className="overflow-y-hidden rounded-lg border">
  //                   <div className="overflow-x-auto">
  //                     <table className="w-full">
  //                       <thead>
  //                         <tr className="bg-black text-center text-xs font-semibold uppercase tracking-widest text-white">
  //                           <th className="px-5 py-3">Username</th>
  //                           <th className="px-5 py-3">Game ID</th>
  //                           <th className="px-5 py-3">Send Request</th>
  //                         </tr>
  //                       </thead>

  //                       <tbody className="text-white">
  //                         {
  //                           friendsList.map((item)=>{
  //                             return (
  //                                 <tr>
  //                                   <td className="border-b border-gray-200 bg-none px-5 py-5 text-sm">
  //                                     <div className="flex items-center">
  //                                       <div className="h-10 w-10 flex-shrink-0">
  //                                         <img className="h-full w-full rounded-full" src={randomPerson} alt="" />
  //                                       </div>
  //                                       <div className="ml-3">
  //                                         <p className="whitespace-no-wrap">{item.userName}</p>
  //                                       </div>
  //                                     </div>
  //                                   </td>
  //                                   <td className="border-b border-gray-200 bg-none px-5 py-5 text-sm">
  //                                     <p className="whitespace-no-wrap">{item.gameId}</p>
  //                                   </td>
  //                                   <td className="border-b border-gray-200 bg-none px-5 py-5 text-sm">
  //                                       <span className={`rounded-full ${item.reqStatus=='Sent'?'bg-blue-200':'bg-yellow-200'} px-3 py-1 text-xs font-semibold ${item.reqStatus=='Sent'?'text-blue-900':'text-yellow-900'} `}>{item.reqStatus=='Send'?'Send':'Sent'}</span>
  //                                   </td>
  //                               </tr>
  //                             )
  //                           })
  //                         }

  //                       </tbody>

  //                     </table>
  //                   </div>
  //                 </div>
  //               </div>
  //               </div>
  //         </div>

  //       </div>
  //   </div>
  // )
  return (
    <>
      <Navbar />
      <div className="bg-slate-800 mainFriendsPage">
        {/* <div className='ballOne rounded-full w-[70vh] h-[90vw] ml-[-20vw] mb-[-20vw] bg-pink-500 blur-3xl opacity-70'></div>
          <div className='ballTwo rounded-full w-[60vh] h-[80vw] mr-[-50vh] bg-blue-500 blur-3xl opacity-70'></div> */}
      </div>

      <div className="pt-5 full-container">
        <div className="">
          <div className="">
            <div className="searchFriends">
              <h1 className="friendListHeader text-5xl  text-white">
                Search Leaderboard
              </h1>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                  </svg>
                              </div> */}
                <input
                  onChange={(e) => setFriendName(e.target.value)}
                  type="search"
                  id="default-search"
                  className="max-w-full w-[400px] block p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Leaderboard"
                  required
                />
                <button
                  onClick={() => {
                    handleSubmitClick();
                  }}
                  type="submit"
                  className="btn btn-primary"
                  id="search-btn"
                >
                  Search/ViewAll
                </button>
              </div>
            </div>

            <div className="friendsListComponent">
              <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-8">
                <div className="overflow-y-hidden rounded-lg border">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-black text-center  font-semibold uppercase tracking-widest text-white">
                          <th className="px-5 py-3">Rank</th>
                          <th className="px-5 py-3">Username</th>
                          <th className="px-5 py-3">Game ID</th>
                          <th className="px-5 py-3">Wins / Games / Losses</th>
                        </tr>
                      </thead>

                      <tbody className="text-white">
                        {friendsList.map((item, indx) => {
                          return (
                            <tr className="text-center">
                              <td className="border-b border-gray-200 bg-none px-5 py-5 text-xl">
                                <div className="whitespace-no-wrap">{indx + 1}</div>
                              </td>
                              <td className="border-b border-gray-200 bg-none px-5 py-5 ">
                                <div className="d-flex align-items-center">
                                  <div className="ml-5 h-10 w-10 flex-shrink-0">
                                    <img
                                      className="h-full w-full rounded-full"
                                      // src={randomPerson}
                                      alt=""
                                    />
                                  </div>
                                  <div className="ml-3">
                                    <div className="">
                                      {item.playerUsername == null
                                        ? ""
                                        : item.playerUsername}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="border-b border-gray-200 bg-none px-5 py-5 align-items-center text-xl">
                                <div className="whitespace-no-wrap">
                                  {item.playerID}
                                </div>
                              </td>
                              <td className="border-b border-gray-200 bg-none px-5 py-5 align-items-center text-xl">
                                <div
                                  className={`${
                                    indx % 2 === 0 ? "first" : "second"
                                  }`}
                                  id="changew"
                                >
                                  {item.wins} / {item.gamesPlayed} /{" "}
                                  {item.losses}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaderBoard;
