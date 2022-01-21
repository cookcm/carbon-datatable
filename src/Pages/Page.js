import React from "react";
import Table1 from "./../Components/Table1";

const Page = () => {
    const headers = [
        {
          key: "id",
          header: "ID"
        },
        {
          key: "name",
          header: "Name"
        },
        {
          key: "productA",
          header: "Product A"
        },
        {
          key: "productB",
          header: "Product B"
        },
        {
          key: "group",
          header: "Group name"
        },
        {
          key: "geo",
          header: "Geo"
        },
        {
          key: "role",
          header: "Role"
        }
      ];
      const rows = [
        {
          id: "1",
          name: "Mark Sandler",
          productA: "Beginner",
          productB: "Expert",
          group: "Group Vincent Dornan",
          geo: "Asia Pacific",
          role: "UI Developer"
        },
        {
          id: "2",
          name: "Kirk Cuban",
          productA: "Expert",
          productB: "Beginner",
          group: "Group Keith Matt",
          geo: "Latin America",
          role: "UX"
        },
        {
          id: "3",
          name: "Ashton Tomlinson",
          productA: "Practicioner",
          productB: "Practicioner",
          group: "Group Ritviz",
          geo: "Asia Pacific",
          role: "Backend Developer"
        },
        {
          id: "4",
          name: "Lori Jackson",
          productA: "Expert",
          productB: "Beginner",
          group: "Group Drake Oliver ",
          geo: "Middle East and Africa",
          role: "Fullstack Developer"
        },
        {
          id: "5",
          name: "Brenda Steven",
          productA: "Beginner",
          productB: "Expert",
          group: "Group Jack Puth",
          geo: "Asia Pacific",
          role: "UI Developer"
        },
        {
          id: "6",
          name: "Kimberly Dan",
          productA: "Expert",
          productB: "Beginner",
          group: "Group Lina Scott Banez",
          geo: "Europe",
          role: "Frontend Developer"
        },
        {
          id: "7",
          name: "Bill Freman",
          productA: "Practicioner",
          productB: "Practicioner",
          group: "Group Drew Forman",
          geo: "Middle East and Africa",
          role: "UX"
        },
        {
          id: "8",
          name: "Grace Aliston Page",
          productA: "Expert",
          productB: "Beginner",
          group: "Group Kate Beck",
          geo: "Asia Pacific",
          role: "Lead Developer"
        }
      ];
      
      
  return (
    <div>
      <h1>Datatable1</h1>
      <Table1
      rows={rows}
      headers={headers}/>
    </div>
  );
};

export default Page;
