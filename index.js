class TechnologyList {
    constructor() {
        this.technologyList = [];
    }

    addTechnology(technology) {
        this.technologyList.push(technology);
    }

    search() {
        let searchText = document.getElementById("searchBox").value;
        let myTable = document.getElementById("techList");
        myTable.innerHTML = "";
        if (searchText != "") {
            let technologies = this.keywordSearch(searchText.split(" "));
            if (technologies.length > 0) {
                this.showTechnologies(technologies);
            }
        } else {
            this.showTechnologies(this.technologyList);
        }
    }

    showTechnologies(technologies) {
        let myTable = document.getElementById("techList");
        myTable.innerHTML = "";
        let mainRow = myTable.insertRow(0);
        let cellOne = mainRow.insertCell(0);
        let cellTwo = mainRow.insertCell(1);
        let cellThree = mainRow.insertCell(2);
        cellOne.innerHTML = "Name";
        cellTwo.innerHTML = "Description";
        cellThree.innerHTML = "Keywords";
        cellOne.setAttribute("class", "w1/2");
        cellTwo.setAttribute("class", "w1/4");
        cellThree.setAttribute("class", "w1/4");
        for (let i = 0; i < technologies.length; i++) {
            let mainRow = myTable.insertRow(i + 1);
            let cellOne = mainRow.insertCell(0);
            let cellTwo = mainRow.insertCell(1);
            let cellThree = mainRow.insertCell(2);
            cellOne.innerHTML = technologies[i].name;
            cellTwo.innerHTML = technologies[i].description;
            cellThree.innerHTML = technologies[i].keywords;
        }
    }

    keywordSearch(searchText) {
        let result = [];
        for (let i = 0; i < this.technologyList.length; i++) {
            for (let j = 0; j < searchText.length; j++) {
                if (this.technologyList[i].keywords.includes(searchText[j])) {
                    result.push(this.technologyList[i]);
                }
            }
        }

        return result;
    }

    loadData() {
        var data = [];
        $.ajax({
            url: 'generated.json',
            async: false,
            dataType: 'json',
            success: function(json) {
                data = json;
            }
        });
        data.forEach(item => {
            var technology = new Technology(item.name, item.description, item.keywords);
            this.addTechnology(technology);
        })
    }
}

class Technology {
    constructor(name, description, keywords) {
        this.name = name;
        this.description = description;
        this.keywords = keywords;
    }
}

let techList = new TechnologyList()
techList.loadData();

window.onload = function() {
    techList.search();
}

// When the user scrolls the page, execute myFunction
window.onscroll = function() { scrollFunc() };

// Get the header
var header = document.getElementById("myHeader");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function scrollFunc() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

function Search() {
    techList.search();
}