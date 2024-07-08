const express = require('express');
const fileUpload = require('express-fileupload');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static('public'));  // Serve static files from 'public' directory
app.use(fileUpload());

app.post('/api/allocate', (req, res) => {
  const groupFile = req.files.groupFile;
  const hostelFile = req.files.hostelFile;

  const groups = [];
  const hostels = [];

  groupFile.mv(path.join(__dirname, 'group.csv'), (err) => {
    if (err) return res.status(500).send(err);

    fs.createReadStream(path.join(__dirname, 'group.csv'))
      .pipe(csv())
      .on('data', (data) => groups.push(data))
      .on('end', () => {
        hostelFile.mv(path.join(__dirname, 'hostel.csv'), (err) => {
          if (err) return res.status(500).send(err);

          fs.createReadStream(path.join(__dirname, 'hostel.csv'))
            .pipe(csv())
            .on('data', (data) => hostels.push(data))
            .on('end', () => {
              console.log('Groups:', groups);
              console.log('Hostels:', hostels);
              const allocation = allocateRooms(groups, hostels);
              console.log('Allocation:', allocation);
              res.json(allocation);
            });
        });
      });
  });
});

function allocateRooms(groups, hostels) {
  const allocation = [];
  groups.forEach(group => {
    const groupSize = parseInt(group.Members, 10);
    const gender = group.Gender.toLowerCase();
    let allocated = false;

    if (gender.includes('boys') && gender.includes('girls')) {
      // Split mixed gender group
      const [boysPart, girlsPart] = gender.split('&').map(part => part.trim());
      const boysCount = parseInt(boysPart.split(' ')[0], 10);
      const girlsCount = parseInt(girlsPart.split(' ')[0], 10);

      // Allocate boys part
      hostels.forEach(hostel => {
        if (allocated) return;

        const capacity = parseInt(hostel.Capacity, 10);
        const hostelGender = hostel.Gender.toLowerCase();

        if (hostelGender === 'boys' && boysCount <= capacity) {
          allocation.push({
            groupId: group['Group ID'],
            hostelName: hostel['Hostel Name'],
            roomNumber: hostel['Room Number'],
            membersAllocated: boysCount,
            gender: 'Boys'
          });
          hostel.Capacity -= boysCount;
          allocated = true;
        }
      });

      allocated = false;  // Reset for girls part

      // Allocate girls part
      hostels.forEach(hostel => {
        if (allocated) return;

        const capacity = parseInt(hostel.Capacity, 10);
        const hostelGender = hostel.Gender.toLowerCase();

        if (hostelGender === 'girls' && girlsCount <= capacity) {
          allocation.push({
            groupId: group['Group ID'],
            hostelName: hostel['Hostel Name'],
            roomNumber: hostel['Room Number'],
            membersAllocated: girlsCount,
            gender: 'Girls'
          });
          hostel.Capacity -= girlsCount;
          allocated = true;
        }
      });

    } else {
      // Allocate single gender group
      hostels.forEach(hostel => {
        if (allocated) return;

        const capacity = parseInt(hostel.Capacity, 10);
        const hostelGender = hostel.Gender.toLowerCase();

        if (hostelGender === gender && groupSize <= capacity) {
          allocation.push({
            groupId: group['Group ID'],
            hostelName: hostel['Hostel Name'],
            roomNumber: hostel['Room Number'],
            membersAllocated: groupSize,
            gender: gender.charAt(0).toUpperCase() + gender.slice(1)
          });
          hostel.Capacity -= groupSize;
          allocated = true;
        }
      });
    }
  });
  return allocation;
}

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
