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
        myTable.innerHTML = "<tr><th style='width:5%;'>Number</th><th>Name</th><th style='width:50%;'>Application</th><th>Keywords</th></tr>";
        for (let i = 0; i < technologies.length; i++) {
            let mainRow = myTable.insertRow(i + 1);
            let cellOne = mainRow.insertCell(0);
            let cellTwo = mainRow.insertCell(1);
            let cellThree = mainRow.insertCell(2);
            let cellFour = mainRow.insertCell(3);
            cellOne.innerHTML = i + 1;
            cellTwo.innerHTML = technologies[i].name;
            cellThree.innerHTML = technologies[i].description;
            cellFour.innerHTML = technologies[i].keywords;
        }
    }

    keywordSearch(searchText) {
        let result = [];
        for (let i = 0; i < this.technologyList.length; i++) {
            for (let j = 0; j < searchText.length; j++) {
                let testWord = searchText[j].toLowerCase();
                if (this.technologyList[i].keywords.includes(testWord)) {
                    result.push(this.technologyList[i]);
                }
            }
        }

        return result;
    }

    loadData() {
        var data = [];
        $.ajax({
            url: 'data.json',
            async: false,
            dataType: 'json',
            success: function(json) {
                data = json;
            }
        });
        data.forEach(item => {
            var technology = new Technology(item.Technology, item.Applications, item.Keywords.toLowerCase());
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

function Search() {
    techList.search();
}