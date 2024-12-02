import java.io.File
import kotlin.math.abs

fun readLinesOfFileToList(filename: String): List<List<Int>> {
    return File(filename).useLines { it.toList() }.map { it.split(" ").map { it.toInt() } }
}

fun isTheSameSign(number1: Int, number2: Int): Boolean {
    return when {
        number1 > 0 && number2 > 0 -> true
        number1 < 0 && number2 < 0 -> true
        else -> false
    }
}

fun prepDistList(list: List<Int>): List<Int> {
    return list.zipWithNext() { el1, el2 -> el1 - el2 }
}

fun main() {
    val reports = readLinesOfFileToList("./src/input.txt")

    // --- Part one
    var sum = 0
    for (report in reports) {
        var isSafe = true
        var lastDist = report[0] - report[1]
        if (
            abs(lastDist) > 3 ||
            abs(lastDist) < 1
        ) isSafe = false
        for (i in 2..(report.size-1)) {
            if (!isSafe) break
            var currDist = report[i-1] - report[i]
            if (
                !isTheSameSign(lastDist, currDist) ||
                abs(currDist) > 3 ||
                abs(currDist) < 1
            ) {
                isSafe = false
            }

            lastDist = currDist
        }

        if (isSafe) sum += 1
    }

    println("Sum: $sum")

    // --- Part two
    // make list of diff
    // first el on list define inc/dec
    // check next based on inc/dec + ranges
    // if one didn't match, use this index
    // 8 6 4 4 1 -> n = 2 or n = 3
    //  2 2 0 3  -> n = 2
    // ex1
    // 1 4 3 5 n = 0 n = 2
    //  3 -1 2  n = 1
    // 1 3 5
    //  2 2

    // 9 7 8 9 7
    // -2 1 1 -2
    // 7 8 9 7
    // 1 1 -2

//    var xd = listOf(listOf(9, 7, 8, 9, 7))
fun makeIteration(items: List<Int>): Boolean {
    var isSafe = true
    var dists = prepDistList(items)
    if (abs(dists[0]) > 3 || abs(dists[0]) < 1)
        isSafe = false

    for (i in 1..(dists.size-1)) {
        if (!isSafe) break
        if (
            !isTheSameSign(dists[i-1], dists[i]) ||
            abs(dists[i]) > 3 ||
            abs(dists[i]) < 1
        ) isSafe = false
    }

    return isSafe
}

    sum = 0
    for (report in reports) {
        /*
        var dists = prepDistList(report)
        var isSafe = true
        if (abs(dists[0]) > 3 || abs(dists[0]) < 1)
            isSafe = false

        for (i in 1..(dists.size-1)) {
            if (!isSafe) break
            if (
                !isTheSameSign(dists[i-1], dists[i]) ||
                abs(dists[i]) > 3 ||
                abs(dists[i]) < 1
            ) isSafe = false
        }

         */
        var isSafe = makeIteration(report)
        var test = false
        if (isSafe) sum += 1
        else {
            for (i in 0..<report.size) {
                if (test) break
                println(report)
                val newList = report.filterIndexed { index, _ -> index != i }
                println(newList)
                test = makeIteration(newList)
            }
            if (test) sum += 1
        }
    }

    println("Sum: $sum")
}