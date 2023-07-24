const Database = require('./database/db');

const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format');


function pageLanding(req, res) {
    return res.render("index.html");
}

async function pageStudy(req, res) {
    const filters = req.query; //Requisição
    if (!filters.subject || filters.weekdays || !filters.time) {
        return res.render("page/study.html", { filters, subjects, weekdays });
    }
    //converte hora em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time);
    const query = `
    SELECT classes.*,proffys.* 
    FROM proffys
    JOIN classes on (classes.proffy_id=proffys.id)
    WHERE EXISTS(
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = classes.id
        AND class_schedule.weekday = "${filters.weekday}"
        AND class_schedule.time_from <= "${timeToMinutes}"
        AND class_schedule.time_to > "${timeToMinutes}"
    )
    AND classes.subject = "${filters.subject}"`;
    //caso haja erro na hora de consulta do banco de dados
    try {
        const db = await Database;
        const proffys = await db.all(query);
        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject);
        });
        return res.render("page/study.html", { proffys, filters, subjects, weekdays });
    } catch (error) {
        console.log(error);
    }
}

function pageGiveClasses(req, res) {
    return res.render("page/give-classes.html", { subjects, weekdays });
}

async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy');
    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsaap: req.body.whatsaap,
        bio: req.body.bio
    }
    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }
    const classScheduleValue = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    });
    try {
        const db = await Database;
        await createProffy(db, { proffyValue, classValue, classScheduleValue });
        let queryString = "?subject=" + req.body.subject;
        queryString += "&weekday=" + req.body.weekday[0];
        queryString += "&time=" + req.body.time_from[0];

        // redirect_after(queryString);
        //Redirect PageSucess depois para Study
        return res.redirect("/sucess" + queryString);
    } catch (error) {
        console.log(error);
    }
}

function redirect_after(req, res) {
    // setTimeout(function() {
    //     console.log("page/study.html" + req);
    //     return windows.location.href = "page/study.html" + req;
    // }, 3000);
}

function pageSucess(req, res) {
    const filters = req.query
    return res.render("page/sucess.html", { filters })
}

//Exportando arquivo
module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses,
    pageSucess,
    redirect_after
}