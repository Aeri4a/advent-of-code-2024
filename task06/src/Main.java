import java.awt.Point;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

public class Main {

    public static ArrayList<String> fillListFromFile(String fileName) {
        var fileContent = new ArrayList<String>();

        try (var fileReader = new Scanner(new File(fileName))) {
            while (fileReader.hasNextLine()) {
                fileContent.add(fileReader.nextLine());
            }
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }

        return fileContent;
    }

    public static boolean checkBounds(int r, int c, int maxR, int maxC) {
        return (r < 0 || r > maxR || c < 0 || c > maxC); // if out of bounds -> true
    }

    public static void main(String[] args) {
        Set<Point> visited = new HashSet<>();

        // PART ONE
        ArrayList<String> rows = fillListFromFile("input.txt");

        // find position of an arrow
        Point arrow = null;
        boolean arrowFound = false;
        for (int i = 0; i < rows.size(); i++) {
            if (arrowFound) break;
            for (int j = 0; j < rows.size(); j++) {
                String word = rows.get(i).split("")[j];
                if (word.equals("^")) {
                    arrow = new Point(i, j);
                    arrowFound = true;
                    break;
                }
            }
        }

        /*
            Direction:
            0 is up
            1 is right
            2 is down
            3 is left
         */
        int direction = 0;
        // Iterate from arrow position
        int r = arrow.x, c = arrow.y;
        int maxR = rows.size() - 1;
        int maxC = rows.get(0).length() - 1;
        boolean outOfBounds = false;
        visited.add(arrow);

        while (!outOfBounds) {
            switch (direction) {
                case 0:
                    if (checkBounds(r-1, c, maxR, maxC)) {
                        outOfBounds = true;
                        break;
                    } else {
                        if (rows.get(r-1).split("")[c].equals("#")) {
                            direction = 1;
                        } else {
                            visited.add(new Point(r, c));
                            r = r-1;
                        }
                    }
                    break;
                case 1:
                    if (checkBounds(r, c+1, maxR, maxC)) {
                        outOfBounds = true;
                        break;
                    } else {
                        if (rows.get(r).split("")[c+1].equals("#")) {
                            direction = 2;
                        } else {
                            visited.add(new Point(r, c));
                            c = c+1;
                        }
                    }
                    break;
                case 2:
                    if (checkBounds(r+1, c, maxR, maxC)) {
                        outOfBounds = true;
                        break;
                    } else {
                        if (rows.get(r+1).split("")[c].equals("#")) {
                            direction = 3;
                        } else {
                            visited.add(new Point(r, c));
                            r = r+1;
                        }
                    }
                    break;
                case 3:
                    if (checkBounds(r, c-1, maxR, maxC)) {
                        outOfBounds = true;
                        break;
                    } else {
                        if (rows.get(r).split("")[c-1].equals("#")) {
                            direction = 0;
                        } else {
                            visited.add(new Point(r, c));
                            c = c-1;
                        }
                    }
                    break;
            }
        }

        System.out.println(visited.size()+1);


        // PART TWO
        // Try every visited be an obstacle
        visited.remove(arrow);
        int loopCounter = 0;
        for (Point p : visited) {
            r = arrow.x; c = arrow.y;
            outOfBounds = false;
            direction = 0;
            Set<String> obstacles = new HashSet<>();


            while (!outOfBounds) {
                switch (direction) {
                    case 0:
                        if (checkBounds(r-1, c, maxR, maxC)) {
                            outOfBounds = true;
                            break;
                        } else {
                            if (
                                    rows.get(r-1).split("")[c].equals("#")
                                    || (r-1 == p.x && c == p.y)
                            ) {
                                String obstacle = new Point(r, c) + "|" + String.valueOf(direction);
                                if (obstacles.contains(obstacle)) {
                                    loopCounter++;
                                    outOfBounds = true;
                                    break;
                                } else {
                                    obstacles.add(obstacle);
                                }

                                direction = 1;
                            } else {
                                r = r-1;
                            }
                        }
                        break;
                    case 1:
                        if (checkBounds(r, c+1, maxR, maxC)) {
                            outOfBounds = true;
                            break;
                        } else {
                            if (
                                    rows.get(r).split("")[c+1].equals("#")
                                    || (r == p.x && c+1 == p.y)
                            ) {
                                String obstacle = new Point(r, c) + "|" + String.valueOf(direction);
                                if (obstacles.contains(obstacle)) {
                                    loopCounter++;
                                    outOfBounds = true;
                                    break;
                                } else {
                                    obstacles.add(obstacle);
                                }

                                direction = 2;
                            } else {
                                c = c+1;
                            }
                        }
                        break;
                    case 2:
                        if (checkBounds(r+1, c, maxR, maxC)) {
                            outOfBounds = true;
                            break;
                        } else {
                            if (
                                    rows.get(r+1).split("")[c].equals("#")
                                    || (r+1 == p.x && c == p.y)
                            ) {
                                String obstacle = new Point(r, c) + "|" + String.valueOf(direction);
                                if (obstacles.contains(obstacle)) {
                                    loopCounter++;
                                    outOfBounds = true;
                                    break;
                                } else {
                                    obstacles.add(obstacle);
                                }

                                direction = 3;
                            } else {
                                r = r+1;
                            }
                        }
                        break;
                    case 3:
                        if (checkBounds(r, c-1, maxR, maxC)) {
                            outOfBounds = true;
                            break;
                        } else {
                            if (
                                    rows.get(r).split("")[c-1].equals("#")
                                    || (r == p.x && c-1 == p.y)
                            ) {
                                String obstacle = new Point(r, c) + "|" + String.valueOf(direction);
                                if (obstacles.contains(obstacle)) {
                                    loopCounter++;
                                    outOfBounds = true;
                                    break;
                                } else {
                                    obstacles.add(obstacle);
                                }

                                direction = 0;
                            } else {
                                c = c-1;
                            }
                        }
                        break;
                }
            }
        }

        System.out.println(loopCounter+1); // it can be without +1
    }
}