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
        myTable.innerHTML = "<tr><th style='width:5%;'>Number</th><th style='width:15%;'>Name</th><th style='width:65%;'>Application</th><th style='width:15%;'>Cases</th><th style='width:15%;'>Keywords</th></tr>";
        for (let i = 0; i < technologies.length; i++) {
            let mainRow = myTable.insertRow(i + 1);
            let cellOne = mainRow.insertCell(0);
            let cellTwo = mainRow.insertCell(1);
            let cellThree = mainRow.insertCell(2);
            let cellFour = mainRow.insertCell(3);
            let cellFive = mainRow.insertCell(4);
            cellOne.innerHTML = i + 1;
            cellTwo.innerHTML = technologies[i].name;
            cellThree.innerHTML = technologies[i].description;
            cellFour.innerHTML = technologies[i].cases;
            cellFive.innerHTML = technologies[i].keywords;
        }
    }

    keywordSearch(searchText) {
        let result = [];
        for (let i = 0; i < this.technologyList.length; i++) {
            for (let j = 0; j < searchText.length; j++) {
                let testWord = searchText[j].toLowerCase();
                for (let k = 0; k < this.technologyList[i].keywords.length; k++) {
                    if (this.technologyList[i].keywords[k].split(' ').length > 1) {
                        let words = this.technologyList[i].keywords[k].split(' ');
                        for (let l = 0; l < words.length; l++) {
                            if (words[l].toLowerCase() == testWord) {
                                result.push(this.technologyList[i]);
                            }
                        }
                    } else {
                        if (this.technologyList[i].keywords[k].toLowerCase() == testWord) {
                            result.push(this.technologyList[i]);
                            break;
                        }
                    }
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
            let keywords = item.Keywords.toLowerCase().split(", ");
            var technology = new Technology(item.Technology, item.Applications, item.Cases, keywords);
            this.addTechnology(technology);
        })
    }
}

class Technology {
    constructor(name, description, cases, keywords) {
        this.name = name;
        this.description = description;
        this.cases = cases
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