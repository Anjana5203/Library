// Retrieve borrowed books data
axios.get("http://localhost:4000/borrowedbooks")
  .then(response => {
    const borrowedBooks = response.data;
    const tableBody = document.querySelector("#borrowedBooksTable tbody");

    borrowedBooks.forEach(book => {
      const row = document.createElement("tr");
      const bookIDCell = document.createElement("td");
      const userIDCell = document.createElement("td");

      bookIDCell.textContent = book.bookID;
      userIDCell.textContent = book.userID;

      row.appendChild(bookIDCell);
      row.appendChild(userIDCell);

      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error(error);
    // Handle error
  });

// Listen for form submission
document.getElementById("borrowForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const userID = document.getElementById("userID").value;
  const bookID = document.getElementById("bookID").value;

  // Show confirmation dialog to the admin
  const confirmation = confirm("Accept the request?");

  if (confirmation) {
    // Send the borrow request to the server
    axios.post("http://localhost:4000/borrow", { userID, bookID })
      .then(response => {
        if (response.data.success) {
          alert("Book borrowed successfully.");
        } else {
          alert(response.data.error);
        }
      })
      .catch(error => {
        console.error(error);
        // Handle error
      });
  }
});
