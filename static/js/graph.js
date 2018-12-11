d3.csv("data/powerlifting.csv", function(error, data) {
    if (error) throw error
    var ndx = crossfilter(data);

    //created selectors
    show_gender_selector(ndx);
    show_equipment_selector(ndx);
    show_federation_selector(ndx);
    show_meet_state_selector(ndx);
    date_selector(ndx);
    event_selector(ndx);

    //ranked charts
    age_class_gender_chart(ndx);
    show_rank_distribution_for_equipment(ndx);
    show_rank_distribution_for_equipment_and_event(ndx);
    show_rank_distribution_for_event(ndx);
    rank_distribution_Meet_Country(ndx);

    //scatterPlot
    //total_place(ndx);

    //rowChart
    place_row_chart(ndx);
    row_chart_tested(ndx)
    

    //pieChart
    pie_chart_age_class(ndx);

    //bubbleChart
    //bubble_chart(ndx)

    //lineChart
    line_chart_WeightClass(ndx);

    dc.renderAll();

    // selector functions
    function show_gender_selector(ndx) {
        var dim = ndx.dimension(dc.pluck("Sex"))
        var group = dim.group();

        dc.selectMenu("#show_sex_selector")
            .dimension(dim)
            .group(group)
            .promptText("Gender");
    };

    function show_equipment_selector(ndx) {
        var dim = ndx.dimension(dc.pluck("Equipment"))
        var group = dim.group();

        dc.selectMenu("#show_equipment_selector")
            .dimension(dim)
            .group(group)
            .promptText("Equipment");;
    };

    function show_federation_selector(ndx) {
        var dim = ndx.dimension(dc.pluck("Federation"))
        var group = dim.group();

        dc.selectMenu("#show_federation_selector")
            .dimension(dim)
            .group(group)
            .promptText("Federation");;
    };

    function show_meet_state_selector(ndx) {
        var dim = ndx.dimension(dc.pluck("MeetState"))
        var group = dim.group()


        dc.selectMenu("#show_meet_state_selector")
            .dimension(dim)
            .group(group)
            .promptText("Meet State");
    };

    function date_selector(ndx) {
        var dim = ndx.dimension(dc.pluck("Date"))
        var group = dim.group();

        dc.selectMenu("#date_selector")
            .dimension(dim)
            .group(group)
            .promptText("Date");;
    };

    function event_selector(ndx) {
        var dim = ndx.dimension(dc.pluck("Event"))
        var group = dim.group();

        dc.selectMenu("#date_selector")
            .dimension(dim)
            .group(group)
            .promptText("Event");;
    };

    //bar chart functions
    function age_class_gender_chart(ndx) {
        var ageClass_dim = ndx.dimension(function(d) { if (d.AgeClass != "Unknown") { return d.AgeClass } })

        function rankBySex(dimension, Sex) {
            return dimension.group().reduce(
                function(p, v) {
                    p.total++;
                    if (v.Sex == Sex) {
                        p.match++;
                    }
                    return p;
                },
                function(p, v) {
                    p.total--;
                    if (v.Sex == Sex) {
                        p.match--;
                    }
                    return p;
                },
                function() {
                    return { total: 0, match: 0 };
                }
            );
        }

        var rankMale = rankBySex(ageClass_dim, "M");
        var rankFemale = rankBySex(ageClass_dim, "F");


        dc.barChart("#age_class_gender-breakdown")
            .height(200)
            .margins({ top: 10, right: 50, bottom: 30, left: 100 })
            .dimension(ageClass_dim)
            .group(rankMale)
            .stack(rankFemale)
            .valueAccessor(function(d) {
                if (d.value.total > 0) {
                    return (d.value.match / d.value.total) * 100;
                }
                else {
                    return 0;
                }
            })
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Age Group")
            .elasticY(1);
    }

    function show_rank_distribution_for_equipment(ndx) {

        var dim = ndx.dimension(dc.pluck("Sex"));

        function rankByEquipment(dimension, equipment) {
            return dimension.group().reduce(
                function addEquipment(p, v) {
                    p.total++;
                    if (v.Equipment == equipment) {
                        p.match++;
                    }
                    return p;
                },
                function removeEquipment(p, v) {
                    p.total--;
                    if (v.Equipment == equipment) {
                        p.match--;
                    }
                    return p;
                },
                function initializeEquipment() {
                    return { total: 0, match: 0 };
                }
            );
        }

        var rankRaw = rankByEquipment(dim, "Raw");
        var rankWraps = rankByEquipment(dim, "Wraps");
        var rankSinglePly = rankByEquipment(dim, "Single-ply");
        var rankMultiPly = rankByEquipment(dim, "Multi-ply");

        dc.barChart("#rank-distribution-for-equipment")
            .width(350)
            .height(200)
            .dimension(dim)
            .group(rankRaw)
            .stack(rankWraps)
            .stack(rankSinglePly)
            .stack(rankMultiPly)
            .valueAccessor(function(d) {
                if (d.value.total > 0) {
                    return (d.value.match / d.value.total) * 100;
                }
                else {
                    return 0;
                }
            })
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Gender")
            .elasticY(1)
            .margins({ top: 10, right: 50, bottom: 30, left: 100 });
    }

    function show_rank_distribution_for_equipment_and_event(ndx) {

        var dim = ndx.dimension(dc.pluck("Equipment"));

        function rankByEquipmentAndEvent(dimension, event) {
            return dimension.group().reduce(
                function addEquipment(p, v) {
                    p.total++;
                    if (v.Event == event) {
                        p.match++;
                    }
                    return p;
                },
                function removeEquipment(p, v) {
                    p.total--;
                    if (v.Event == event) {
                        p.match--;
                    }
                    return p;
                },
                function initializeEquipment() {
                    return { total: 0, match: 0 };
                }
            );
        }

        var rankSquat = rankByEquipmentAndEvent(dim, "S");
        var rankBench = rankByEquipmentAndEvent(dim, "B");
        var rankDeadlift = rankByEquipmentAndEvent(dim, "D");
        var rankSquatBench = rankByEquipmentAndEvent(dim, "SB");
        var rankSquatDeadlift = rankByEquipmentAndEvent(dim, "SD");
        var rankBenchDeadlift = rankByEquipmentAndEvent(dim, "BD");
        var rankSquatBenchDeadlift = rankByEquipmentAndEvent(dim, "SBD");

        dc.barChart("#show_rank_distribution_for_equipment_and_event")
            .height(200)
            .width(500)
            .dimension(dim)
            .group(rankSquat)
            .stack(rankBench)
            .stack(rankDeadlift)
            .stack(rankSquatBench)
            .stack(rankSquatDeadlift)
            .stack(rankBenchDeadlift)
            .stack(rankSquatBenchDeadlift)
            .valueAccessor(function(d) {
                if (d.value.total > 0) {
                    return (d.value.match / d.value.total) * 100;
                }
                else {
                    return 0;
                }
            })
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .elasticY(1)
            .margins({ top: 10, right: 50, bottom: 30, left: 100 });
    }

    function show_rank_distribution_for_event(ndx) {

        var dim = ndx.dimension(dc.pluck("Event"));

        function rankByGender(dimension, Sex) {
            return dimension.group().reduce(
                function(p, v) {
                    p.total++;
                    if (v.Sex == Sex) {
                        p.match++;
                    }
                    return p;
                },
                function(p, v) {
                    p.total--;
                    if (v.Sex == Sex) {
                        p.match--;
                    }
                    return p;
                },
                function() {
                    return { total: 0, match: 0 };
                }
            );
        }

        var genderF = rankByGender(dim, "F")
        var genderM = rankByGender(dim, "M")

        dc.barChart("#rank-distribution-for-event")
            .width(350)
            .height(200)
            .margins({ top: 10, right: 50, bottom: 30, left: 50 })
            .dimension(dim)
            .group(genderM)
            .stack(genderF)
            .valueAccessor(function(d) {
                if (d.value.total > 0) {
                    return (d.value.match / d.value.total) * 100;
                }
                else {
                    return 0;
                }
            })
            .transitionDuration(500)
            .elasticY(1)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Event");

    }

    function rank_distribution_Meet_Country(ndx) {

        var dim = ndx.dimension(dc.pluck("MeetCountry"));

        function rankByGender(dimension, Sex) {
            return dimension.group().reduce(
                function(p, v) {
                    p.total++;
                    if (v.Sex == Sex) {
                        p.match++;
                    }
                    return p;
                },
                function(p, v) {
                    p.total--;
                    if (v.Sex == Sex) {
                        p.match--;
                    }
                    return p;
                },
                function() {
                    return { total: 0, match: 0 };
                }
            );
        }

        var genderF = rankByGender(dim, "F")
        var genderM = rankByGender(dim, "M")

        dc.barChart("#rank-distribution-for-Meet-Country")
            .width(2000)
            .height(200)
            .margins({ top: 10, right: 50, bottom: 30, left: 50 })
            .dimension(dim)
            .group(genderM)
            .stack(genderF)
            .valueAccessor(function(d) {
                if (d.value.total > 0) {
                    return (d.value.match / d.value.total) * 100;
                }
                else {
                    return 0;
                }
            })
            .transitionDuration(500)
            .elasticY(1)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Meet Country")
            .elasticX(true);



    }

    //row chart
    function row_chart_tested(ndx) {

        var tDim = ndx.dimension(dc.pluck("Tested"));
        var tested_group = tDim.group();

        dc.rowChart("#row_chart_tested")
            .height(110)
            .width(370)
            .dimension(tDim)
            .group(tested_group)
            .elasticX(1)
            .fixedBarHeight(25)
            .cap(2);
    }
    
    function place_row_chart(ndx) {
        var place_dim = ndx.dimension(dc.pluck("Place"))
        var place_group = place_dim.group();

        dc.rowChart("#row-chart-place")
            .height(200)
            .width(700)
            .dimension(place_dim)
            .group(place_group)
            .elasticX(1)
            .fixedBarHeight(25)
            .cap(4);
    }

    //pie-chart
    function pie_chart_age_class(ndx) {

        var dim_age_class = ndx.dimension(function(d) { if (d.AgeClass != "Unknown") { return d.AgeClass } })

        var group_age_class = dim_age_class.group()

        dc.pieChart("#piechart_age_class")
            .width(400)
            .height(220)
            .slicesCap(10)
            .innerRadius(5)
            .dimension(dim_age_class)
            .group(group_age_class)
            .legend(dc.legend());
    };

    // bubble
    /* function bubble_chart(ndx) {

        var b_dim = ndx.dimension(function(d) {
            if (d.Sex != "" && d.Tested != "" && d.MeetCountry != "") { return [d.Sex, d.MeetCountry, d.Tested] };
        });

        //var min_age = b_dim.top(1)[0].Age;
        //var max_age = b_dim.bottom(1)[0].Age;

        var b_group = b_dim.group().reduceCount();

        dc.bubbleChart("#bubbleChart")
            .width(500)
            .height(400)
            .margins({ top: 10, right: 50, bottom: 30, left: 60 })
            .dimension(b_dim)
            .group(b_group)
            .keyAccessor(function(p) {
                return p.key[2];
            })
            .radiusValueAccessor(function(p) {
                return (Math.floor((p.value / 10)) + 1);
            })
            .x(d3.scale.linear().domain([0, 100]))
            .y(d3.scale.linear().domain([-50, 100]))
            .r(d3.scale.linear().domain([0, 10]))
            .minRadiusWithLabel(1000)
            .yAxisPadding(50)
            .xAxisPadding(100)
            .maxBubbleRelativeSize(0.1)
            .renderHorizontalGridLines(true)
            .renderVerticalGridLines(true)
            .renderLabel(true)
            .renderTitle(true)
            .title(function(p) {
                return p.key[0] +
                    "\n" +
                    "Tested: " + p.key[2] +
                    "Country: " + p.key[1] +
                    "Count: " + p.value;
            })
    }; */

    // line chart
    function line_chart_WeightClass(ndx) {

        var wDim = ndx.dimension(function(d) { return parseInt(d.WeightClassKg) });

        //get min and max values for X Axis
        var min_weightClass = wDim.bottom(1)[0].WeightClassKg
        var max_weightClass = wDim.top(1)[0].WeightClassKg

        var weightClassKg_group = wDim.group().reduceCount();

        dc.lineChart("#line_chart_WeightClass")
            .width(700)
            .height(300)
            .x(d3.scale.linear().domain([min_weightClass, max_weightClass]))
            .elasticY(1)
            .brushOn(false)
            .yAxisLabel("")
            .xAxisLabel("WeightClassKg")
            .dimension(wDim)
            .group(weightClassKg_group)
            .dotRadius(10)
            .renderArea(1)
            .renderDataPoints({ radius: 10, fillOpacity: 0.5, strokeOpacity: 0.5 })
            .on('renderlet', function(chart) {
                chart.selectAll('rect').on('click', function(d) {
                    console.log('click!', d);
                })
            })
            .title(function(p) {
                return "Count: " + p.value;
            })
    };
});
